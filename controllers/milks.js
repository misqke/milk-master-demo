const Milks = require("../models/milkSchema");

const getAllMilks = async (req, res) => {
  try {
    const milks = await Milks.find().sort("_id");
    res.status(200).json({ msg: "success", data: milks });
  } catch (error) {
    console.log(error);
  }
};

const updateMilk = async (req, res) => {
  try {
    const milk = req.body;
    const newMilk = await Milks.findByIdAndUpdate(milk._id, milk, {
      new: true,
    });
    res.status(201).json({ msg: "success", data: newMilk });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllMilks,
  updateMilk,
};
