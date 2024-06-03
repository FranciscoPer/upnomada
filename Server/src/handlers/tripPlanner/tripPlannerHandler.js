const {getTripPlan} = require("../../controllers/tripPlanner/tripPlannerController")


const tripPlannerHandler = async (req, res) => {
  const { days, destination } = req.query;
  const { userId } = req.body; // Asegúrate de obtener el userId del usuario autenticado

  try {
    const tripPlan = await getTripPlan(days, destination, userId);
    res.status(200).json(tripPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { tripPlannerHandler };