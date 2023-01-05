const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const userTable = sequalize.define("users", {
  contactNo: {
    type: DataTypes.STRING(10),
    allowNull: false,
    isNumeric: true,
    unique: true,
  },
  prefix: {
    type: DataTypes.STRING(6),
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 20],
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 20],
    },
  },
  gender: {
    type: DataTypes.STRING(6),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    isEmail: true,
    unique: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  medicalcardImage: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    isUrl: true,
  },
  licenceFname: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 20],
    },
  },
  licenceLname: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 20],
    },
  },
  licenceNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  licenceType: {
    type: DataTypes.STRING,
    allowNull: true,
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
    allowNull: true,
    unique: true,
    isUrl: true,
  },
  licenceFrontImage: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    isUrl: true,
  },
});

module.exports = userTable;
