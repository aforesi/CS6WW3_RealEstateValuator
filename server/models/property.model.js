const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const propertySchema = new Schema(
  {
    yearBuilt: { type: Number, required: true },
    stories: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    fullBathrooms: { type: Number, required: true },
    halfBathrooms: { type: Number, required: true },
    totalSquareFeet: { type: Number, required: true },
    livableSquareFeet: { type: Number, required: true },
    garageSquareFeet: { type: Number, required: true },
    garageType: { type: String, required: true },
    fireplace: { type: Boolean, required: true },
    pool: { type: Boolean, required: true },
    centralHeating: { type: Boolean, required: true },
    centralCooling: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
