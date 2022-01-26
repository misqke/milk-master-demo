const jwt = require("jsonwebtoken");

const login = (req, res) => {
  try {
    const { password } = req.body;
    if (password === `${process.env.APP_PASSWORD}`) {
      const token = jwt.sign({ name: "milkMaster" }, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });
      res.status(201).json({ msg: "success", data: token });
    } else {
      res.status(403).json({ error: "incorrect password" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  login,
};
