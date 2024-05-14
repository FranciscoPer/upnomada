// controllers/subscriptionController.js
const stripe = require('../../handlers/stripe/stripeClient');
const { User } = require('../../db');

const cancelSubscriptionController = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        if (!user || !user.stripeCustomerId || !user.subscriptionId) {
            throw new Error('No subscription found to cancel');
        }

        // Usa 'stripe.subscriptions.update' para cancelar la suscripción
        const canceledSubscription = await stripe.subscriptions.update(user.subscriptionId, {
            cancel_at_period_end: true
        });

        user.subscriptionStatus = false;
        user.subscriptionId = null;
        await user.save();

        return { status: 'cancelled', subscriptionId: canceledSubscription.id };
    } catch (error) {
        throw new Error('Failed to cancel subscription: ' + error.message);
    }
};

module.exports = { cancelSubscriptionController };
