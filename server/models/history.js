const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const historyTable = sequalize.define("history", {
  contactNo: {
    type: DataTypes.STRING(10),
    unique: true,
  },
  loanId: {
    type: DataTypes.NUMBER,
  },
});

module.exports = historyTable;
