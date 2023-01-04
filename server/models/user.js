const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const loanTable = require("./loan");
const incomeTable = require("./income");
const expensesTable = require("./expenses");
const carTable = require("./car");

const userTable = sequalize.define("users", {
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  income: {
    type: DataTypes.INTEGER,
    isNumeric: true,
    allowNull: false,
    min: 100000,
  },
  contactNo: {
    type: DataTypes.STRING(10),
    allowNull: false,
    isNumeric: true,
    unique: true,
  },
  prefix: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  gender: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    isEmail: true,
    unique: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  medicalcardImage: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isUrl: true,
  },
  licenceFname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  licenceLname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  licenceNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  licenceType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  licenceIssueDate: {
    type: DataTypes.STRING,
    validate: {
      isAfter: "1980-01-01",
      isBefore: "2024-01-01",
    },
  },
  licenceExpireDate: {
    type: DataTypes.STRING,
    validate: {
      isAfter: "2023-01-01",
    },
  },
  licenceBackImage: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isUrl: true,
  },
  licenceFrontImage: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    isUrl: true,
  },
});

userTable.hasMany(loanTable, {
  onDelete: "SET NULL",
});
userTable.hasMany(incomeTable, {
  onDelete: "SET NULL",
});
userTable.hasMany(expensesTable, {
  onDelete: "SET NULL",
});

module.exports = userTable;
