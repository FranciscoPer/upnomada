const stripe = require('./stripeClient');

const createProduct = async (name, description) => {
  try {
    const product = await stripe.products.create({
      name,
      description,
    });
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

module.exports = { createProduct };
