const express = require('express');
const { Router } = require ("express");
const {webhookHandler} = require('../handlers/stripe/webhookhHandler');

const webhookRouter = Router();

webhookRouter.post('/', express.raw({type: 'application/json'}), (req, res, next) => {
    console.log('Webhook received:', req.body); // Esto te ayudará a ver el payload crudo que Stripe envía
    next();
}, webhookHandler);

module.exports = webhookRouter;