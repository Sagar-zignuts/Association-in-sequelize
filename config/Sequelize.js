const { Sequelize } = require('sequelize');
require('dotenv').config();

//Make connection with sequelize
const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    logging: false,
  }
);
const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected');
  } catch (error) {
    console.log('error in connection', error.message);
  }
};
checkConnection();

module.exports = { sequelize };
