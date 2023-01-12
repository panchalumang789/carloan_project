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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rental_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  investment_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  salary_secrifice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  centralink_benifit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  foreign_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = incomeTable;
