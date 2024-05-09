const stripe = require('./stripeClient');

const createPlan = async (amount, currency, interval, product) => {
  try {
    const plan = await stripe.plans.create({
      amount,
      currency,
      interval,
      product: product.id,
    });
    return plan;
  } catch (error) {
    console.error("Error creating plan:", error);
    throw error;
  }
};

module.exports = { createPlan };
