const { users } = require('../models/users');
const { products } = require('../models/product');
const { orders } = require('../models/order');

//Insert data into the user table
const insertDataInUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ status: 400, message: 'Name is required' });
    }
    await users.create({ name });
    return res.status(200).json({ status: 200, message: 'Inserted' });
  } catch (error) {
    return res
      .status(500)
      .json({ json: 500, message: 'Error in inserting data into user', error });
  }
};

//Insert data into the product table
const insertDataProduct = async (req, res) => {
  try {
    const { name, price, user_id } = req.body;

    if (!name || !price || !user_id) {
      return res
        .status(400)
        .json({ status: 400, message: 'Field is required' });
    }

    await products.create({ name, price, user_id });
    return res.status(200).json({ status: 200, message: 'Inserted' });
  } catch (error) {
    return res.status(500).json({
      json: 500,
      message: 'Error in inserting data into product',
      error,
    });
  }
};

//insert data into order table
const insertDataOrder = async (req, res) => {
  try {
    const { name, user_id } = req.body;

    if (!name || !user_id) {
      return res
        .status(400)
        .json({ status: 400, message: 'Field is required' });
    }

    await orders.create({ name, user_id });
    return res.status(200).json({ status: 200, message: 'Inserted' });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      json: 500,
      message: 'Error in inserting data into Order',
      error,
    });
  }
};

//Get all data by order table
const getDataViaOrder = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ status: 400, message: 'Id is required' });
    }

    const data = await orders.findOne({
      where: { id },
      include: {
        model: users,
        include: products,
      },
    });

    if (data === null) {
      return res
        .status(400)
        .json({ status: 400, message: 'Please enter proper order id' });
    }

    return res.status(200).json({ status: 200, message: 'Got', Order: data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: 'Error in get data into product', error });
  }
};

module.exports = {
  insertDataInUser,
  insertDataProduct,
  getDataViaOrder,
  insertDataOrder,
};
