const router = require("express").Router();
const isAuth = require("../auth/isAuth");
let Property = require("../models/property.model");
let Prediction = require("../models/prediction.model");
const mongoose = require("mongoose");

// For authentication check
router.use(isAuth);

// Return all properties
router.route("/").get((req, res) => {
  // Auth token check
  if (!req.isAuth && parseInt(req.query.requestNum) === 0) {
    return res.status(403).json("Unauthenticated!");
  }

  if (parseInt(req.query.requestNum) === 0) {
    Property.find({})
    .sort({_id:1}).limit(50)
    .then((properties) => {
      res.json(properties);
    })
    .catch(err => res.status(400).json("Error: " + err));
  } else {
    Property.find({_id: {$gt: req.query.lastId}})
    .sort({_id:1}).limit(50)
    .then((properties) => {
      res.json(properties);
    })
    .catch(err => res.status(400).json("Error: " + err));
  }


  
});

// Return all calculated properties
router.route("/predictedProperties").get((req, res) => {
  // Auth token check
  if (!req.isAuth) {
    return res.status(403).json("Unauthenticated!");
  }
  Prediction.find({"userId": mongoose.Types.ObjectId(req.query.userId)})
  .then((calculatedProperties) => {
    res.json(calculatedProperties);
  })
  .catch(err => res.status(400).json("Error: " + err));  
});

// Return closest properties by proximity
router.route("/proximity").get((req, res) => {
  Property.find(
    {
      loc:
        { $near :
           {
              $geometry: { type: "Point",  coordinates: [ req.query.lng, req.query.lat ] },
              $maxDistance: 300
           }
        }
    }
 )
 .then(properties => res.json(properties))
 .catch(err => res.status(400).json("Error: " + err));
});


router.route('/addCalculatedProperty').post((req, res) => {

  const yearBuilt = req.body.yearBuilt;
  const stories = req.body.stories;
  const bedrooms = req.body.bedrooms;
  const fullBathrooms = req.body.fullBathrooms;
  const halfBathrooms = req.body.halfBathrooms;
  const livableSquareFeet = req.body.livableSquareFeet;
  const garageSquareFeet = req.body.garageSquareFeet;
  const totalSquareFeet = req.body.totalSquareFeet;
  const garageType = req.body.garageType;
  const address = req.body.address;
  const fireplace = req.body.fireplace;
  const pool = req.body.pool;
  const centralHeating = req.body.centralHeating;
  const centralCooling = req.body.centralCooling;
  const salePrice = req.body.calculatedValue;
  const userId = req.body.userId;

  const newPrediction = new Prediction({
    yearBuilt,
    address,
    stories,
    bedrooms,
    fullBathrooms,
    halfBathrooms,
    livableSquareFeet,
    totalSquareFeet,
    garageSquareFeet,
    garageType,
    fireplace,
    pool,
    centralHeating,
    centralCooling,
    salePrice,
    userId
  });

    newPrediction.save()
    .then(prediction => res.send(prediction)).catch(err => res.status(400).json("Error: " + err));

  
})


// Get one property with id
router.route("/:id").get((req, res) => {
  // Auth token check
  if (!req.isAuth) {
    return res.status(403).json("Unauthenticated!");
  }
  Property.findById(req.params.id)
    .then(property => res.json(property))
    .catch(err => res.status(400).json("Error: " + err));
});

// Delete a property with id
router.route("/:id").delete((req, res) => {
  // Auth token check
  if (!req.isAuth) {
    return res.status(403).json("Unauthenticated!");
  }
  Property.findByIdAndDelete(req.params.id)
    .then(() => res.json("Property deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

// Update a property with id
router.route("/update/:id").post((req, res) => {
  // Auth token check
  if (!req.isAuth) {
    return res.status(403).json("Unauthenticated!");
  }
  Property.findById(req.params.id)
    .then(property => {
      property.yearBuilt = Number(req.body.yearBuilt);
      property.stories = Number(req.body.stories);
      property.bedrooms = Number(req.body.bedrooms);
      property.fullBathrooms = Number(req.body.fullBathrooms);
      property.halfBathrooms = Number(req.body.halfBathrooms);
      property.totalSquareFeet = Number(req.body.totalSquareFeet);
      property.livableSquareFeet = Number(req.body.livableSquareFeet);
      property.garageSquareFeet = Number(req.body.garageSquareFeet);
      property.garageType = req.body.garageType;
      property.fireplace = req.body.fireplace === "true";
      property.pool = req.body.pool === "true";
      property.centralHeating = req.body.centralHeating === "true";
      property.centralCooling = req.body.centralCooling === "true";
      property.latitude = parseFloat(req.body.latitude);
      property.longitude = parseFloat(req.body.longitude);

      property
        .save()
        .then(() => res.json("Property updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
