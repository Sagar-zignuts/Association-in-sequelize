const { sequelize } = require('../config/Sequelize');

const { Sequelize, DataTypes } = require('sequelize');
const { users } = require('./users');

const products = sequelize.define(
  'products',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'products',
    freezeTableName: true,
  }
);

users.hasMany(products, { foreignKey: 'user_id' });
products.belongsTo(users, { foreignKey: 'user_id' });

module.exports = { products };
