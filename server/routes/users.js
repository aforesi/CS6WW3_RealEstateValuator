const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const bcrypt = require("bcryptjs");
let User = require("../models/user.model");

router.use(expressValidator());

// User list
router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// Sign up/Register
router.route("/register").post((req, res) => {
  // Get form values from post request
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const city = req.body.city;
  const isAgent = req.body.isRealEstateAgent;

  // Validate input values
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.checkBody("password", "Password is required").notEmpty();
  req
    .checkBody("password2", "Passwords do not match")
    .equals(req.body.password);
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("lastName", "Last Name is required").notEmpty();

  let errors = req.validationErrors();

  // Check for validation errors
  if (errors) {
    res.json("Validation error: " + { errors: errors });
  }
  // No validation errors
  else {
    // Same email check
    User.find({ email: email }, function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      // User email already exist in DB
      if (data.length != 0) {
        res.json("User email exist!");
      }
    }).catch(err => res.status(400).json("Error: " + err));

    // Create new user object
    let newUser = new User({
      email: email,
      password: password,
      name: name,
      lastName: lastName,
      city: city,
      isAgent: isAgent
    });

    // Password hashing
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        // Check for hashing errors
        if (err) {
          console.log("Password hashing error: " + err);
        }
        // Change pw in newUser
        newUser.password = hash;

        console.log("New user registration: " + newUser);
        // Save new user into DB and return the result
        newUser
          .save()
          .then(() => res.json("User added!"))
          .catch(err => res.status(400).json("Error: " + err));
      });
    });
  }
});

// Login
router.route("/login").post((req, res) => {
  // Get email and password from request
  const userEmail = req.body.email;
  const password = req.body.password;
  // Print the attempt
  console.log("User login " + userEmail);
  // Find in the DB with email
  let query = { email: userEmail };
  User.findOne(query, function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    // Couldn't find it
    if (!data) {
      console.log("Login try: " + userEmail + " not exist!");
      res.json("Email or password is not correct.");
      return;
    }
    // Found it
    else {
      // Compare hashed passwords
      bcrypt.compare(password, data.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          console.log("Login try: " + userEmail + " -> Success");
          res.json("Succesfully logged in!");
        } else {
          console.log("Login try: " + userEmail + " wrong password!");
          res.json("Email or password is not correct.");
        }
      });
    }
  }).catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
