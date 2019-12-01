const router = require("express").Router();
let Property = require("../models/property.model");

router.route("/").get((req, res) => {
  Property.find()
    .then(properties => res.json(properties))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const yearBuilt = Number(req.body.yearBuilt);
  const stories = Number(req.body.stories);
  const bedrooms = Number(req.body.bedrooms);
  const fullBathrooms = Number(req.body.fullBathrooms);
  const halfBathrooms = Number(req.body.halfBathrooms);
  const totalSquareFeet = Number(req.body.totalSquareFeet);
  const livableSquareFeet = Number(req.body.livableSquareFeet);
  const garageSquareFeet = Number(req.body.garageSquareFeet);
  const garageType = req.body.garageType;
  const fireplace = req.body.fireplace === "true";
  const pool = req.body.pool === "true";
  const centralHeating = req.body.centralHeating === "true";
  const centralCooling = req.body.centralCooling === "true";
  const latitude = parseFloat(req.body.latitude);
  const longitude = parseFloat(req.body.longitude);

  const newProperty = new Property({
    yearBuilt,
    stories,
    bedrooms,
    fullBathrooms,
    halfBathrooms,
    totalSquareFeet,
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

router.route("/:id").get((req, res) => {
  Property.findById(req.params.id)
    .then(property => res.json(property))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Property.findByIdAndDelete(req.params.id)
    .then(() => res.json("Property deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Property.findById(req.params.id)
    .then(property => {
      property.username = req.body.username;
      property.description = req.body.description;
      property.duration = Number(req.body.duration);
      property.date = Date.parse(req.body.date);

      property
        .save()
        .then(() => res.json("Property updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
