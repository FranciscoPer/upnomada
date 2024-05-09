const { Router } = require ("express");
const { createProductHandler } = require('../handlers/stripe/createProductHandler');
const { createPlanHandler} = require('../handlers/stripe/createPlanHandler')
const {createSubscriptionHandler} = require ('../handlers/stripe/createSubscriptionHandler')
const {createCheckoutSessionHandler} = require('../handlers/stripe/checkOutSessionHandler')
const stripeRouter = Router();

stripeRouter.post('/products', createProductHandler);
stripeRouter.post('/plans', createPlanHandler);
stripeRouter.post('/subscriptions', createSubscriptionHandler);
stripeRouter.post('/create-checkout-session', createCheckoutSessionHandler);

module.exports = stripeRouter;
