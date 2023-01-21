const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const adminTable = sequalize.define("admins", {
  contactNo: {
    type: DataTypes.STRING(10),
    allowNull: false,
    isNumeric: true,
    unique: true,
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    isEmail: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = adminTable;
