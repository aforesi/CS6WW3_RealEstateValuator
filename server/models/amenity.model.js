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

const amenitySchema = new Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: { type: String, required: true },
    amenity_type: { type: String, required: true },
    loc: geoSchema
  },
  
  {
    timestamps: true
  }
);

const Amenity = mongoose.model("Amenity", amenitySchema);

module.exports = Amenity;
