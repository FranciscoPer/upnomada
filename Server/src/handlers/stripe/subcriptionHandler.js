// handlers/subscriptionHandler.js

const { createSubscriptionController } = require('../../controllers/stripe/subscriptionController');

const subscriptionHandler = async (req, res) => {
    const { userId, priceId } = req.body;

    try {
        const result = await createSubscriptionController(userId, priceId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { subscriptionHandler };
