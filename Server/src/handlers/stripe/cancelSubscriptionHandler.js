// handlers/subscriptionHandler.js
const { cancelSubscriptionController } = require('../../controllers/stripe/cancelSubscriptionController');

const cancelSubscriptionHandler = async (req, res) => {
    const { userId } = req.body; // Asegúrate de que el ID del usuario se envía correctamente

    try {
        const result = await cancelSubscriptionController(userId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { cancelSubscriptionHandler };
