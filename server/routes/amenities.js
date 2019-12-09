const router = require("express").Router();
// const isAuth = require("../auth/isAuth");
let Amenity = require("../models/amenity.model");
// For authentication check
// router.use(isAuth);


// Return closest amenities by proximity
router.route("/proximity").get((req, res) => {
    Amenity.find(
    {
      loc:
        { $near :
           {
              $geometry: { type: "Point",  coordinates: [ req.query.lng, req.query.lat ] },
              $maxDistance: 1000
           }
        }
    }
 )
 .then(amenities => res.json(amenities))
 .catch(err => res.status(400).json("Error: " + err));
});




module.exports = router;
