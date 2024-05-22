const { updateBackgroundController } = require("../../controllers/backGround/updateBackgroundController");

const updateBackgroundHandler = async (req, res) => {
  try {
    const background = await updateBackgroundController(req.body);
    res.status(200).json(background);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateBackgroundHandler };