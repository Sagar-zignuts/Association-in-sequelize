const express = require('express');
const app = express();
const { sequelize } = require('./config/Sequelize');
const { UserRoute, ProductRoute, OrderRoute } = require('./routes/index');

//Use middleware for getting data from body
app.use(express.json());

//Main routes
app.use('/user', UserRoute);
app.use('/product', ProductRoute);
app.use('/order', OrderRoute);

//Set the sequelize and start the server via function named createUser
const createUser = async () => {
  try {
    await sequelize.sync({ force: false }); // force : true is only for developer
    app.listen(3000, () => {
      console.log('Running on port 3000');
    });
  } catch (error) {
    console.log(`Error in server : ${error.message}`);
  }
};

//calling the function
createUser();
