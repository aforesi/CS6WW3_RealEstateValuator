const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 7
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    city: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    isAgent: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
