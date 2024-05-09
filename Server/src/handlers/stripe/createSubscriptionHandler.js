const { createSubscription } = require('../../controllers/stripe/createSubscription');

const createSubscriptionHandler = async (req, res) => {
  const { customerId, planId } = req.body;
  try {
    const subscription = await createSubscription(customerId, planId);
    res.status(201).json({
      message: "Subscription created successfully",
      subscription
    });
  } catch (error) {
    console.error("Failed to create subscription:", error);
    res.status(500).send("Failed to create subscription: " + error.message);
  }
};

module.exports = {createSubscriptionHandler}
