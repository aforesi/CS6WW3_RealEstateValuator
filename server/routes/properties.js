const router = require("express").Router();
const isAuth = require("../auth/isAuth");
let Property = require("../models/property.model");
let CalculatedProperty = require("../models/calculatedProperty.model");
// For authentication check
router.use(isAuth);

// Return all properties
router.route("/").get((req, res) => {
  // Auth token check
  if (!req.isAuth) {
    return res.status(403).json("Unauthenticated!");
  }
  Property.find({})
    .then((properties) => {
      res.json(properties);
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




// Add new property
router.route("/add").post((req, res) => {
  // Auth token check
  if (!req.isAuth) {
    return res.status(403).json("Unauthenticated!");
  }
  const yearBuilt = Number(req.body.yearBuilt);
  const stories = Number(req.body.stories);
  const bedrooms = Number(req.body.bedrooms);
  const fullBathrooms = Number(req.body.fullBathrooms);
  const halfBathrooms = Number(req.body.halfBathrooms);
  const livableSquareFeet = Number(req.body.livableSquareFeet);
  const garageSquareFeet = Number(req.body.garageSquareFeet);
  const garageType = req.body.garageType;
  const fireplace = req.body.fireplace === "true";
  const pool = req.body.pool === "true";
  const centralHeating = req.body.centralHeating === "true";
  const centralCooling = req.body.centralCooling === "true";
  const latitude = parseFloat(req.body.latitude);
  const longitude = parseFloat(req.body.longitude);

  const newProperty = new CalculatedProperty({
    yearBuilt,
    stories,
    bedrooms,
    fullBathrooms,
    halfBathrooms,
    livableSquareFeet,
    garageSquareFeet,
    garageType,
    fireplace,
    pool,
    centralHeating,
    centralCooling,
    latitude,
    longitude
  });

  newProperty
    .save()
    .then(() => res.json("Property added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

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
