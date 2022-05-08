const getMilks = require("../getMilksScraper");

const getMilkData = async (req, res) => {
  try {
    const milks = await getMilks();
    res.status(200).json(milks);
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

module.exports = {
  getMilkData,
};
