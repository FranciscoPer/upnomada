const { putFlightController } = require("../../controllers/flights/putFlightController");

const putFlightHandler = async (req, res) => {
  const flightId = req.params.id;
  const updateData = req.body;

  try {
    const updatedFlight = await putFlightController(flightId, updateData);
    res.status(200).json(updatedFlight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { putFlightHandler };
