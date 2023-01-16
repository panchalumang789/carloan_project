const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const incomeTable = sequalize.define("incomes", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  loanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  additional_income: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  rental_income: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  investment_income: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  salary_sacrifice: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  centralink_benifit: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  foreign_income: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = incomeTable;
