const carTable = require("../models/car");
const loanTable = require("../models/loan");
const userTable = require("../models/user");
const incomeTable = require("../models/income");
const expensesTable = require("../models/expenses");

carTable.hasMany(loanTable);

loanTable.hasMany(incomeTable, {
  onDelete: "SET NULL",
});

loanTable.hasMany(expensesTable, {
  onDelete: "SET NULL",
});

userTable.hasMany(loanTable, {
  foreignKey: "contactNo",
  sourceKey: "contactNo",
});

userTable.hasMany(incomeTable, {
  onDelete: "SET NULL",
});

userTable.hasMany(expensesTable, {
  onDelete: "SET NULL",
});
