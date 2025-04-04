const { products } = require('../models/product');

//Insert data into the product table
const insertDataProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res
        .status(400)
        .json({ status: 400, message: 'Name and price are required' });
    }

    const product = await products.create({ name, price });
    return res
      .status(200)
      .json({ status: 200, message: 'Product created', product });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Error in inserting data into product',
      error: error.message,
    });
  }
};

module.exports = { insertDataProduct };
