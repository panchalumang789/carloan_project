const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const expensesTable = sequalize.define("expenses", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  loanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  vehicle_running_cost: {
    type: DataTypes.INTEGER,
  },
  travel_cost: {
    type: DataTypes.INTEGER,
  },
  utilities_cost: {
    type: DataTypes.INTEGER,
  },
  insurance: {
    type: DataTypes.INTEGER,
  },
  tel_internet: {
    type: DataTypes.INTEGER,
  },
  entertainment: {
    type: DataTypes.INTEGER,
  },
});

module.exports = expensesTable;
