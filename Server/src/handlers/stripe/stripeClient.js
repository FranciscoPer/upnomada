// stripeClient.js
// Importar la biblioteca de Stripe y configurarla con tu clave API secreta.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
