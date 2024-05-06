const { getFlightsController } = require('../../controllers/flights/getFlightsController');

const getFlightsHandler = async (req, res) => {
  const filters = {
    flightId: req.query.flightId,
    destination: req.query.destination,
    origin: req.query.origin,
    departureDate: req.query.departureDate,
    returnDate: req.query.returnDate,
    type: req.query.type
  };

  try {
    const flights = await getFlightsController(filters);
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getFlightsHandler };