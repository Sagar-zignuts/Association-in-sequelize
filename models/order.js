const { Sequelize, DataTypes, or } = require('sequelize');
const { sequelize } = require('../config/Sequelize');
const { users } = require('./users');
const { details } = require('./details');
const { products } = require('./product');

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
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: users,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
});

users.hasMany(orders, { foreignKey: 'user_id' });
orders.belongsTo(users, { foreignKey: 'user_id' });

orders.belongsToMany(products, { through: details });
products.belongsToMany(orders, { through: details });

module.exports = { orders };
