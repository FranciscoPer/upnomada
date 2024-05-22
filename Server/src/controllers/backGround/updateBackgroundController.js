const { Background } = require("../../db");

const updateBackgroundController = async (backgroundDetails) => {
  const { imageUrl1, imageUrl2, imageUrl3 } = backgroundDetails;

  try {
    const [background, created] = await Background.findOrCreate({
      where: { backgroundId: 1 },
      defaults: {
        imageUrl1,
        imageUrl2,
        imageUrl3
      }
    });

    if (!created) {
      background.imageUrl1 = imageUrl1;
      background.imageUrl2 = imageUrl2;
      background.imageUrl3 = imageUrl3;
      await background.save();
    }

    return background;
  } catch (error) {
    console.error("Error en updateBackgroundController:", error);
    throw error;
  }
};

module.exports = { updateBackgroundController };
