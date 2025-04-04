const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/Sequelize');
const { orders } = require('./order');
const { products } = require('./product');

const details = sequelize.define(
  'details',
  {
    orderId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: orders,
        key: 'id',
      },
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: products,
        key: 'id',
      },
    },
  },
  {
    tableName: 'details',
    freezeTableName: true,
  }
);

module.exports = { details };
