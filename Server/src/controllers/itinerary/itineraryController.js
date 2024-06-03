const { Itinerary } = require('../../db');

const getUserItineraries = async (userId) => {
  try {
    const itineraries = await Itinerary.findAll({
      where: { userId }
    });
    return itineraries;
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    throw error;
  }
};

module.exports = { getUserItineraries };
