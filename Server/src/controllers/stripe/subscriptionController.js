// controllers/subscriptionController.js
const stripe = require('../../handlers/stripe/stripeClient');
const { User } = require('../../db');
  // Asegúrate de que la ruta es correcta

const createStripeCustomer = async (user) => {
    const customer = await stripe.customers.create({
        email: user.email,
        name: user.name + ' ' + user.lastName, // Ajusta según tus necesidades
        metadata: { userId: user.userId }
    });
    return customer.id;
};

const createSubscriptionController = async (userId, priceId) => {
    try {
        const user = await User.findByPk(userId);

        // Crear cliente en Stripe si aún no tiene uno asignado
        if (!user.stripeCustomerId) {
            user.stripeCustomerId = await createStripeCustomer(user);
            await user.save();
        }

        const session = await stripe.checkout.sessions.create({
            customer: user.stripeCustomerId,  // Asigna el cliente existente
            payment_method_types: ['card'],
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: 'https://localhost:3001/flights?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://localhost:3001/',
            metadata: { userId } // Añadimos metadata para saber qué usuario inició el pago
        });

        return { paymentLink: session.url };
    } catch (error) {
        throw new Error('Failed to create subscription: ' + error.message);
    }
};

module.exports = { createSubscriptionController };
