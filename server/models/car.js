const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const loanTable = require("./loan");

const carTable = sequalize.define("cars", {
  make: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  production_year: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  model_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

carTable.hasMany(loanTable);

// carTable
//   .sync()
//   .then((result) => {
//     return result;
//   })
//   .catch((error) => {
//     return error;
//   });

module.exports = carTable;
