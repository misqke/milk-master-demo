const scraper = require("../scraper");
const scraper2 = require("../scraper2");

let image = "";

const clearImage = () => {
  image = "";
};

const submitInventory = async (req, res) => {
  try {
    const { milks, username, password } = req.body;
    if (
      username.toLowerCase() !== `${process.env.DEANS_LOGIN}` ||
      password !== `${process.env.DEANS_PASSWORD}`
    ) {
      return res.status(401).json({ error: "incorrect login or password" });
    }
    runScraper(milks, username, password, 1);
    res.status(201).json({
      msg: "Submitting inventory... This may take a few minutes... Do not close or refresh browser... ",
    });
  } catch (error) {
    console.log(error);
  }
};

const submitOrder = async (req, res) => {
  try {
    const { milks, username, password } = req.body;
    if (
      username.toLowerCase() !== `${process.env.DEANS_LOGIN}` ||
      password !== `${process.env.DEANS_PASSWORD}`
    ) {
      return res.status(401).json({ error: "incorrect login or password" });
    }
    runScraper(milks, username, password, 2);
    res.status(201).json({
      msg: "Submitting order... This may take a few minutes... Do not close or refresh browser... ",
    });
  } catch (error) {
    console.log(error);
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
          msg: `${num === 1 ? "Inventory" : "Order"} Posted Successfully`,
          data: image,
        });
      }
    } else {
      return res.status(200).json({
        msg: `Submitting ${
          num === 1 ? "inventory" : "order"
        }... This may take a few minutes... Do not close or refresh browser... `,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const runScraper = async (milks, username, password, num) => {
  if (num === 1) {
    image = await scraper(milks, username, password);
  } else {
    image = await scraper2(milks, username, password);
  }
};

module.exports = {
  submitInventory,
  submitOrder,
  getConfirmation,
};
