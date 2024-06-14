const { getFlightsController } = require('../../controllers/flights/getFlightsController');

const getFlightsHandler = async (req, res) => {
  const filters = {
    flightId: req.query.flightId,
    destination: req.query.destination,
    origin: req.query.origin,
    destinationAirport: req.query.destinationAirport,
    originAirport: req.query.originAirport,
    departureDate: req.query.departureDate,
    returnDate: req.query.returnDate,
    type: req.query.type,
    sortByPrice: req.query.sortByPrice, // 'asc' o 'desc'
    sortByDepartureDate: req.query.sortByDepartureDate // 'asc' o 'desc'
  };

  try {
    const flights = await getFlightsController(filters);
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getFlightsHandler };