const { createProduct } = require('../../controllers/stripe/productController');

const createProductHandler = async (req, res) => {
  const { name, description } = req.body;
  try {
    const product = await createProduct(name, description);
    res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (error) {
    console.error("Failed to create product:", error);
    res.status(500).send("Failed to create product: " + error.message);
  }
};

module.exports = {createProductHandler}