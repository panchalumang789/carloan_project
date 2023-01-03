const { DataTypes } = require("sequelize");
const sequalize = require("../config/db.connection");

const incomeTable = sequalize.define({
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  loanId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  additional_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rental_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  investment_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  salary_secrifice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  foreign_income: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

incomeTable.associate = (userTable) => {
  incomeTable.belongsTo(userTable.id);
};
incomeTable.associate = (loanTable) => {
  incomeTable.belongsTo(loanTable.id);
};

module.exports = incomeTable;
