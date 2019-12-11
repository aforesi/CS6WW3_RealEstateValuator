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

const propertySchema = new Schema(
  {
    _id: mongoose.Types.ObjectId,
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
    centralCooling: { type: Boolean, required: true },
    // loc: geoSchema,
    salePrice: { type: Number, required: false}
  },
  {
    timestamps: true
  }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
