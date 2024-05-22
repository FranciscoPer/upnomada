const { getBackgroundController } = require("../../controllers/backGround/getBackgroundController");

const getBackgroundHandler = async (req, res) => {
  try {
    const background = await getBackgroundController();
    res.status(200).json(background);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBackgroundHandler };
