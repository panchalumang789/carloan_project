const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

let carTable = sequalize.define("cars", {
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

// carTable
//   .sync()
//   .then((result) => {
//     return result;
//   })
//   .catch((error) => {
//     return error;
//   });

module.exports = carTable;
