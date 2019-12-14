const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const geoSchema = new Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
})

const predictionSchema = new Schema(
  {
    // _id: mongoose.Types.ObjectId,
    yearBuilt: { type: String, required: false },
    address: { type: String, required: false },
    stories: { type: String, required: false },
    bedrooms: { type: String, required: false },
    fullBathrooms: { type: String, required: false },
    halfBathrooms: { type: String, required: false },
    livableSquareFeet: { type: String, required: false },
    totalSquareFeet: { type: String, required: false },
    garageSquareFeet: { type: String, required: false },
    garageType: { type: String, required: false },
    fireplace: { type: Boolean, required: false },
    pool: { type: Boolean, required: false },
    centralHeating: { type: Boolean, required: false },
    centralCooling: { type: Boolean, required: false },
    // loc: geoSchema,
    salePrice: { type: String, required: false},
    userId: { type: mongoose.Types.ObjectId, required: false}
  },
  
  {
    timestamps: true
  }

);

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;
