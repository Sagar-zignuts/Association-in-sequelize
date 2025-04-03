const { Sequelize, DataTypes, or } = require('sequelize');
const { sequelize } = require('../config/Sequelize');
const { products } = require('./product');
const { users } = require('./users');

const orders = sequelize.define('orders', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
});

users.hasMany(orders, { foreignKey: 'user_id' });
orders.belongsTo(users, { foreignKey: 'user_id' });

orders.belongsToMany(products, { through: 'productData' });
products.belongsToMany(orders, { through: 'productData' });

module.exports = { orders };
