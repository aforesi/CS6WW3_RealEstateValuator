const router = require("express").Router();
// const { PythonShell } = require("python-shell");
// let Property = require("../models/property.model");
const {PythonShell} = require("python-shell");
const {resolve} = require('path');

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
  console.log("latitude: ", req.body.lat);
  console.log("longitude: ", req.body.lng);


  // // Could be useful if we want to save new property in DB
  // const newProperty = new Property({
  //   yearBuilt,
  //   stories,
  //   bedrooms,
  //   fullBathrooms,
  //   halfBathrooms,
  //   totalSquareFeet,
  //   livableSquareFeet,
  //   garageSquareFeet,
  //   garageType,
  //   fireplace,
  //   pool,
  //   centralHeating,
  //   centralCooling
  // });

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
  
  var options = {
    mode: 'text',
    encoding: 'utf8',
    pythonOptions: ['-u'],
    scriptPath: resolve('../python'),
    args: data,
    pythonPath: 'python'
  }

  PythonShell.run('api.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
    // res.json(results);
  });

  //Also return the top 10 closest houses by proximity
  


});


module.exports = router;
