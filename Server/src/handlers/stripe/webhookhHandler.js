// handlers/stripe/webhookHandler.js
const stripe = require('./stripeClient'); 
const { User } = require('../../db');  

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const webhookHandler = async (req, res) => {
    const sig = req.headers['stripe-signature'];    
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("Evento recibido:", event);

    switch (event.type) {
        case 'checkout.session.completed':
            await handleCheckoutSessionCompleted(event.data.object);
            break;
        case 'customer.subscription.created':
            await handleSubscriptionCreated(event.data.object);
            break;
        case 'customer.subscription.updated':
            await handleSubscriptionUpdated(event.data.object);
            break;
        case 'customer.subscription.deleted':
            await handleSubscriptionDeleted(event.data.object);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
};

const handleCheckoutSessionCompleted = async (session) => {
    const user = await User.findOne({ where: { stripeCustomerId: session.customer } });
    if (user) {
        user.subscriptionStatus = true;
        user.subscriptionId = session.subscription;
        await user.save();
    }
};

const handleSubscriptionCreated = async (subscription) => {
    const user = await User.findOne({ where: { stripeCustomerId: subscription.customer } });
    if (user) {
        user.subscriptionStatus = true;
        user.subscriptionId = subscription.id;
        await user.save();
    }
};

const handleSubscriptionUpdated = async (subscription) => {
    const user = await User.findOne({ where: { stripeCustomerId: subscription.customer } });
    if (user) {
        user.subscriptionStatus = (subscription.status === 'active');
        await user.save();
    }
};

const handleSubscriptionDeleted = async (subscription) => {
    const user = await User.findOne({ where: { stripeCustomerId: subscription.customer } });
    if (user) {
        user.subscriptionStatus = false;
        await user.save();
    }
};

module.exports = {webhookHandler};
