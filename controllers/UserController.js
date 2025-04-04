const { users } = require('../models/users');

//Insert data into the user table
const insertDataInUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ status: 400, message: 'Name is required' });
    }

    const user = await users.create({ name });
    return res.status(200).json({ status: 200, message: 'User created', user });
  } catch (error) {
    return res
      .status(500)
      .json({
        status: 500,
        message: 'Error in inserting data into user',
        error: error.message,
      });
  }
};

module.exports = { insertDataInUser };
