const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const incomeTable = require("./income");
const expensesTable = require("./expenses");

const loanTable = sequalize.define("loans", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  agentId: {
    type: DataTypes.INTEGER,
  },
});

loanTable.associate = (userTable) => {
  loanTable.belongsTo(userTable.id);
};

loanTable.associate = (carTable) => {
  loanTable.belongsTo(carTable.id);
};

loanTable.hasMany(incomeTable, {
  onDelete: "SET NULL",
});

loanTable.hasMany(expensesTable, {
  onDelete: "SET NULL",
});

module.exports = loanTable;
