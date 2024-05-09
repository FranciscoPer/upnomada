const createSubscription = async (customerId, planId) => {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ plan: planId }],
      });
      return subscription;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  };
  
  module.exports = { createSubscription };
  