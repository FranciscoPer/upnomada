const { Background } = require("../../db");

const getBackgroundController = async () => {
  try {
    const background = await Background.findOne({ where: { backgroundId: 1 } });
    return background;
  } catch (error) {
    console.error("Error en getBackgroundController:", error);
    throw error;
  }
};

module.exports = { getBackgroundController };
