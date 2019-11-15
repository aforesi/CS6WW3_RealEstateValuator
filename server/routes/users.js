const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/register").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const city = req.body.city;
  const isAgent = req.body.isRealEstateAgent;

  const newUser = new User({
    email,
    password,
    name,
    lastName,
    city,
    isAgent
  });

  console.log("New user added! " + newUser);

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/login").post((req, res) => {
  // Get email and password from request
  const userEmail = req.body.email;
  const password = req.body.password;
  // Print the attempt
  console.log("User login " + userEmail);
  // Find in the DB with email
  User.find({ email: userEmail }, function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    // Couldn't find it
    if (data.length == 0) {
      console.log("No record found");
      return;
    } else {
      // Found it
      if (data[0].password === password) {
        res.json("Succesfully logged in!");
      } else {
        res.json("Email or password is not correct.");
      }
    }
  }).catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
