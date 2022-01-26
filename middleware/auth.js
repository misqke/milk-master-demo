const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    return res.status(401).json({ msg: "You must be logged in to do this." });
  }
  jwt.verify(token, `${process.env.JWT_SECRET}`, (error) => {
    if (error) {
      console.log("failed authentication", error);
      return res.status(403).json({ error });
    }
    console.log("authentication successfull");
    next();
  });
};

module.exports = authenticateToken;
