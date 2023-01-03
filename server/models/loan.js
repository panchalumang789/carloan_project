const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const userTable = require("./user");

const loanTable = sequalize.define("loans", {
  userid: {
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
  additional_income: {
    type: DataTypes.INTEGER,
  },
  rental_income: {
    type: DataTypes.INTEGER,
  },
  investment_income: {
    type: DataTypes.INTEGER,
  },
  salary_secrifice: {
    type: DataTypes.INTEGER,
  },
  foreign_income: {
    type: DataTypes.INTEGER,
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
  insurances: {
    type: DataTypes.INTEGER,
  },
  tel_internet: {
    type: DataTypes.INTEGER,
  },
  entertainment: {
    type: DataTypes.INTEGER,
  },
});

loanTable.associate = (userTable) => {
  loanTable.belongsTo(userTable.id);
};

// loanTable
//   .sync({ force: true })
//   .then((result) => {
//     return result;
//   })
//   .catch((error) => {
//     return error;
//   });

module.exports = loanTable;
