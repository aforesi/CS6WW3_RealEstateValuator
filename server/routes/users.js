const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../auth/isAuth");
let User = require("../models/user.model");
// For authentication check
router.use(isAuth);
// For form validation
router.use(expressValidator());

// User list
router.route("/").get((req, res) => {
  // Check for authentication
  if (!req.isAuth) {
    return res.status(403).json("Unauthenticated!");
  }
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

// Delete user
router.route("/:id").delete((req, res) => {
  // Check for authentication
  if (!req.isAuth) {
    return res.status(403).json("Unauthenticated!");
  }
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
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
    res.json({ error: true, message: "Validation error.", errors: errors });
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
        res.json({ error: true, message: "This email already exists!" });
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
          res.json({ error: true, message: "Password hashing error: " + err });
          throw err;
        }
        // Change pw in newUser
        newUser.password = hash;

        console.log("New user registration: " + newUser);
        // Save new user into DB and return the result
        newUser
          .save()
          .then(() => res.json({ message: "Successfully registered!" }))
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
  User.findOne(query, function(err, user) {
    if (err) {
      console.log(err);
      return;
    }
    // Couldn't find it
    if (!user) {
      console.log("Login try: " + userEmail + " not exist!");
      res.json({ error: true, message: "Email or password is not correct." });
      return;
    }
    // Found it
    else {
      // Compare hashed passwords
      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err) throw err;
        // Wrong password
        if (!isMatch) {
          console.log("Login try: " + userEmail + " wrong password!");
          res.json({
            error: true,
            message: "Email or password is not correct."
          });
        }
        // Successful login
        else {
          console.log("Login try: " + userEmail + " -> Success");
          // Generate JWT token
          const token = jwt.sign(
            { email: user.email },
            "realEstateValuatorTokenKey",
            { expiresIn: "1h" }
          );
          // Return results
          res.json({
            message: "Succesfully logged in!",
            userId: user._id,
            email: user.email,
            authToken: token,
            tokenExpiration: 1
          });
        }
      });
    }
  }).catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
