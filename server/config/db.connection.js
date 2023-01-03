const Sequelize = require("sequelize");

const sequalize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: process.env.PGDIALECT,
    logging: false,
  }
);
// const path = `${process.env.PGDIALECT}://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
// const sequalize = new Sequelize(path, { logging: false });

sequalize
  .authenticate()
  .then(() => console.log("Database Connected."))
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequalize;
