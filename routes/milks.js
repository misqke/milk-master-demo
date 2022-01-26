const express = require("express");
const { getAllMilks, updateMilk } = require("../controllers/milks");

const router = express.Router();

router.route("/").get(getAllMilks).patch(updateMilk);

module.exports = router;
