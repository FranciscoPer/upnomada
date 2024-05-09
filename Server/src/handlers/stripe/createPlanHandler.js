const { createPlan } = require('../../controllers/stripe/planController');

const createPlanHandler = async (req, res) => {
  const { amount, currency, interval, productId } = req.body;
  try {
    const plan = await createPlan(amount, currency, interval, { id: productId });
    res.status(201).json({
      message: "Plan created successfully",
      plan
    });
  } catch (error) {
    console.error("Failed to create plan:", error);
    res.status(500).send("Failed to create plan: " + error.message);
  }
};

module.exports = {createPlanHandler}
