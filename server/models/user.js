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
    unique: true,
    isUrl: true,
  },
  licenseFirstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  licenseLastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 20],
    },
  },
  licenseIssueDate: {
    type: DataTypes.STRING,
    validate: {
      isAfter: "1980-01-01",
      isBefore: "2024-01-01",
    },
    allowNull: false,
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
  licenceExpireDate: {
    type: DataTypes.STRING,
    validate: {
      isAfter: "2023-01-01",
    },
    allowNull: false,
  },
  licenceIssueState: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  licenceBackImage: {
    type: DataTypes.STRING,
    unique: true,
    isUrl: true,
  },
  licenceFrontImage: {
    type: DataTypes.STRING,
    unique: true,
    isUrl: true,
  },
});

module.exports = userTable;
