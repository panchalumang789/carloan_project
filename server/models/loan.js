const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const loanTable = sequalize.define("loans", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  carId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  ballon: {
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
  contactNo: {
    type: DataTypes.STRING(10),
    allowNull: false,
    isNumeric: true,
  },
  agentId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = loanTable;
