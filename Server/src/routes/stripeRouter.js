const { Router } = require ("express");
const { subscriptionHandler } = require('../handlers/stripe/subcriptionHandler');
const {cancelSubscriptionHandler} = require('../handlers/stripe/cancelSubscriptionHandler')


const subscriptionRouter = Router();

subscriptionRouter.post('/', subscriptionHandler);
subscriptionRouter.post("/cancel-subscription", cancelSubscriptionHandler)

module.exports = subscriptionRouter;