const { deleteFlightController } = require("../../controllers/flights/deleteFlightController")

const deleteFlightHandler = async (req, res) => {
  const { id } = req.params;  // Cambia 'flightId' por 'id'

  try {
    const result = await deleteFlightController(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {deleteFlightHandler}
