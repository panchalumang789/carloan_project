const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const loanTable = sequalize.define("loans", {
  carId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  approx_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deposit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  term: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  balloon: {
    type: DataTypes.INTEGER,
  },
  user_status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  user_income: {
    type: DataTypes.INTEGER,
    isNumeric: true,
    allowNull: false,
    min: 100000,
  },
  agentId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = loanTable;
