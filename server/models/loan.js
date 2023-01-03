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
