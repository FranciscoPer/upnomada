const {postFlightController} = require("../../controllers/flights/postFlightsController")


const postFlightHandler = async (req, res) => {
  try {
    const flight = await postFlightController(req.body);
    res.status(201).json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  
module.exports = {postFlightHandler}