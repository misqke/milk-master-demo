const express = require("express");

const {
  submitInventory,
  submitOrder,
  getConfirmation,
} = require("../controllers/submits");
const router = express.Router();

router.post("/inventory", submitInventory);
router.post("/order", submitOrder);
router.get("/confirmation", getConfirmation);

module.exports = router;
