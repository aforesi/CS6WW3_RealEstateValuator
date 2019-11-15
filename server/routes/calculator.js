const router = require("express").Router();
let Property = require("../models/property.model");

router.route("/").post((req, res) => {
  const yearBuilt = Number(req.body.yearBuilt);
  const stories = Number(req.body.stories);
  const bedrooms = Number(req.body.bedrooms);
  const fullBathrooms = Number(req.body.fullBathrooms);
  const halfBathrooms = Number(req.body.halfBathrooms);
  const totalSquareFeet = Number(req.body.totalSquareFeet);
  const livableSquareFeet = Number(req.body.livableSquareFeet);
  const garageSquareFeet = Number(req.body.garageSquareFeet);
  const garageType = req.body.garageType;
  const fireplace = req.body.fireplace;
  const pool = req.body.pool;
  const centralHeating = req.body.centralHeating;
  const centralCooling = req.body.centralCooling;
  let pythonData;

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
    centralCooling
  });

  // Call python function
  //   runPy
  //     .then(function(fromRunpy) {
  //       console.log(fromRunpy.toString());
  //       res.end(fromRunpy);
  //     })
  //     .catch(err => res.status(400).json("Error: " + err));

  const spawn = require("child_process").spawn;
  const pythonProcess = spawn("python", [
    "./../../python/apiNode.py",
    yearBuilt,
    stories,
    bedrooms,
    fullBathrooms,
    halfBathrooms,
    livableSquareFeet,
    totalSquareFeet,
    garageSquareFeet,
    fireplace,
    pool,
    centralHeating,
    centralCooling
  ]);
  // Listen for results
  pythonProcess.stdout.on("data", data => {
    // Do something with the data returned from python script
    pythonData = data.toString();
    console.log(data);
  });

  if (pythonData !== null) {
    res.status(400).json("Error: Python couldn't return the data");
  } else {
    res.json(pythonData);
  }
});

let runPy = new Promise(function(success, nosuccess) {
  const { spawn } = require("child_process");
  const pyprog = spawn("python", ["./../../python/apiNode.py"]);

  pyprog.stdout.on("data", function(data) {
    success(data);
  });

  pyprog.stderr.on("data", data => {
    nosuccess(data);
  });
});

module.exports = router;
