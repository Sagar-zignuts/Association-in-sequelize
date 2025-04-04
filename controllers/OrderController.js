// const { orders, products, users } = require('../models/index');

const { orders } = require('../models/order');
const { users } = require('../models/users');
const { products } = require('../models/product');

//insert data into order table
const insertDataOrder = async (req, res) => {
  try {
    const { name, user_id, productIds } = req.body;

    if (!name || !user_id) {
      return res
        .status(400)
        .json({ status: 400, message: 'Name and user_id are required' });
    }

    // Verify user_id exists
    const user = await users.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ status: 400, message: 'User not found' });
    }

    // Create the order
    const order = await user.createOrder({ name, user_id });

    // Associate products if productIds are provided
    if (productIds && Array.isArray(productIds)) {
      const productInstances = await products.findAll({
        where: { id: productIds },
      });
      //no of products and no of ids which are put in array are same.
      if (productInstances.length !== productIds.length) {
        return res
          .status(400)
          .json({ status: 400, message: 'One or more products not found' });
      }

      //addProducts method will automatically created when association will astablished
      await order.addProducts(productInstances);
    }

    return res
      .status(200)
      .json({ status: 200, message: 'Order created', order });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Error in inserting data into Order',
      error: error.message,
    });
  }
};

//Get all data by order table
const getDataViaOrder = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ status: 400, message: 'Order ID is required' });
    }

    //use nested include to get both data
    const data = await orders.findOne({
      where: { id },
      include: [
        {
          model: users,
          as: 'user',
        },
        {
          model: products,
          as: 'products',
          through: { attributes: [] },
        },
      ],
    });

    if (!data) {
      return res.status(400).json({ status: 400, message: 'Order not found' });
    }

    return res
      .status(200)
      .json({ status: 200, message: 'Order retrieved', order: data });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: 'Error retrieving order data',
      error: error.message,
    });
  }
};

module.exports = { getDataViaOrder, insertDataOrder };
