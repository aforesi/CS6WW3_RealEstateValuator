const router = require("express").Router();
const { PythonShell } = require("python-shell");
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

  // Could be useful if we want to save new property in DB
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

  let data = [
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
  ];

  // Python shell arguments and other options
  var options = {
    mode: "text",
    pythonPath: "python",
    pythonOptions: ["-u"],
    scriptPath: "B:\\6WW3_Final\\python",
    args: data
  };

  // Call python script
  PythonShell.run("apiNode.py", options, function(err, result) {
    if (err) {
      console.log(err);
      res.status(400).json("Error: Python couldn't return any data");
    }
    // Result is an array consisting of messages collected during execution
    console.log("Result: %j", result);
    // Check if python returned
    if (result === null) {
      res.status(400).json("Error: Python returned null data");
    } else {
      res.json(result);
    }
  });
});

// router.route("/").get(callD_alembert);

// var options = {
//   mode: "text",
//   pythonPath: "python",
//   pythonOptions: ["-u"],
//   scriptPath: "B:\\6WW3_Final\\python",
//   args: [2010, 1, 1, 1, 0, 400, 500, 100, 0, 0, 0, 0]
// };

// function callD_alembert(req, res) {
//   PythonShell.run("apiNode.py", options, function(err, result) {
//     if (err) throw err;
//     // Result is an array consisting of messages collected during execution
//     console.log("result: %j", result);
//     res.json(result);
//   });
// }

module.exports = router;
