const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Get request's header Authorization
  const authHeader = req.get("Authorization");
  // If its empty return false
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  // Split the string into parts --> Authorization Bearer jwtToken
  const token = authHeader.split(" ")[1];
  // Check for emptiness
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  // Decode token with key
  try {
    decodedToken = jwt.verify(token, "realEstateValuatorTokenKey");
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  // Return false
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  // Return true
  req.isAuth = true;
  req.email = decodedToken.email;
  next();
};
