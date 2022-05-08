const express = require("express");
const { getMilkData } = require("../controllers/milks");

const router = express.Router();

router.route("/").get(getMilkData);

module.exports = router;
