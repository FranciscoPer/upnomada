// handlers/stripe/webhookHandler.js
const stripe = require('./stripeClient'); 
const { User } = require('../../db');  

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

const webhookHandler = async (req, res) => {
    const sig = req.headers['stripe-signature'];    
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

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
    console.log(`Looking for user with Stripe ID: ${subscription.customer}`);
    const user = await User.findOne({ where: { stripeCustomerId: subscription.customer } });
    if (user) {
        console.log('User found:', user.email);
        user.subscriptionStatus = true;
        user.subscriptionId = subscription.id;
        try {
            await user.save();
            console.log('Subscription status updated for user:', user.email);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    } else {
        console.log('No user found for this Stripe Customer ID:', subscription.customer);
    }
};


const handleSubscriptionUpdated = async (subscription) => {
    const user = await User.findOne({ where: { stripeCustomerId: subscription.customer } });
    if (user) {
        user.subscriptionStatus = (subscription.status === 'active');
        await user.save();
        console.log('Subscription updated for user:', user.email);
    } else {
        console.log('No user found for this updated subscription:', subscription.customer);
    }
};


const handleSubscriptionDeleted = async (subscription) => {
    const user = await User.findOne({ where: { stripeCustomerId: subscription.customer } });
    if (user) {
        user.subscriptionStatus = false; // Marca la suscripción como inactiva
        await user.save();
        console.log('Subscription deleted for user:', user.email);
    } else {
        console.log('No user found for this deleted subscription:', subscription.customer);
    }
};


module.exports = {webhookHandler};
