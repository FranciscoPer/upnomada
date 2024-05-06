const {getTripPlan} = require("../../controllers/tripPlanner/tripPlannerController")


const tripPlannerHandler = async (req, res) => {
  const { days, destination } = req.query; // Asegúrate de que estos parámetros se envíen en la solicitud

  try {
    const tripPlan = await getTripPlan(days, destination);
    res.status(200).json(tripPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {tripPlannerHandler}
