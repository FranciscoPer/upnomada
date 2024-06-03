const { getUserItineraries } = require("../../controllers/itinerary/itineraryController");

const getItinerariesHandler = async (req, res) => {
  const { userId } = req.params;

  try {
    const itineraries = await getUserItineraries(userId);
    res.status(200).json(itineraries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getItinerariesHandler };
