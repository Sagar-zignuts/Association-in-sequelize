const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/Sequelize');
const users = sequelize.define(
  'users',
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
  },
  {
    tableName: 'users',
    freezeTableName: true,
  }
);

module.exports = { users };
