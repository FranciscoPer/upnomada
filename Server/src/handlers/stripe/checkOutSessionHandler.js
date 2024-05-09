// checkoutSessionHandler.js
const stripe = require('../../controllers/stripe/stripeClient');  // Asegúrate de que la ruta es correcta

const createCheckoutSessionHandler = async (req, res) => {
    const { priceId } = req.body;  // Este ID deberías recibirlo desde el front-end

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [{
                price: priceId,
                quantity: 1,
            }],
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.status(201).send({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).send(`Error creating checkout session: ${error.message}`);
    }
};

module.exports = { createCheckoutSessionHandler };
