const inventoryScraper = require("../inventoryScraper");
const orderScraper = require("../orderScraper");

let image = "";

const clearImage = () => {
  image = "";
};

const submitInventory = async (req, res) => {
  try {
    const { milks } = req.body;
    // if (
    //   login.toLowerCase() !== `${process.env.DEANS_LOGIN}` ||
    //   password !== `${process.env.DEANS_PASSWORD}`
    // ) {
    //   return res.json({ error: "incorrect login or password" });
    // }
    runScraper(milks, 1);
    res.status(201).json({
      message: "Submitting inventory... ",
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

const submitOrder = async (req, res) => {
  try {
    const { milks } = req.body;
    // if (
    //   login.toLowerCase() !== `${process.env.DEANS_LOGIN}` ||
    //   password !== `${process.env.DEANS_PASSWORD}`
    // ) {
    //   return res.json({ error: "incorrect login or password" });
    // }
    runScraper(milks, 2);
    res.status(201).json({
      message: "Submitting order... ",
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

const getConfirmation = async (req, res) => {
  try {
    const { num } = req.query;
    if (image) {
      setTimeout(() => clearImage(), 22000);
      if (image === "error") {
        return res.status(500).json({ error: "Submission failed." });
      } else {
        return res.status(200).json({
          message: `${num === "1" ? "Inventory" : "Order"} Posted Successfully`,
          data: image,
        });
      }
    } else {
      return res.status(200).json({
        message: `Submitting ${num === "1" ? "inventory" : "order"}...`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

const runScraper = async (milks, num) => {
  if (num === 1) {
    image = await inventoryScraper(milks);
  } else {
    image = await orderScraper(milks);
  }
};

module.exports = {
  submitInventory,
  submitOrder,
  getConfirmation,
};
