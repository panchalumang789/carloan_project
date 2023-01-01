const dbConnect = require("../config/db.connection");

const carTable = dbConnect
  .query(
    `CREATE TABLE IF NOT EXISTS cars (
        id SERIAL NOT NULL PRIMARY KEY, 
        make VARCHAR(30) NOT NULL,
        model VARCHAR(50) NOT NULL,
        production_year VARCHAR[] NOT NULL,
        model_type VARCHAR(50) NOT NULL UNIQUE,
        image VARCHAR(1000) NOT NULL UNIQUE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT (now())
    )`
  )
  .then((result) => {
    return result;
  })
  .catch((error) => {
    return error;
  });

module.exports = carTable;
