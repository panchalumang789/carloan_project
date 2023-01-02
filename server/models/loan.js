const dbConnect = require("../config/db.connection");

const loanTable = dbConnect
  .query(
    `CREATE TABLE IF NOT EXISTS loans(
        id SERIAL,
        approx_price INTEGER NOT NULL,
        deposit INTEGER NOT NULL,
        additional_income INTEGER NOT NULL,
        created_at TIMESTAMPTZ DEFAULT (now()),
        updated_at TIMESTAMPTZ DEFAULT (now())
    )`
  )
  .then((result) => {
    return result;
  })
  .catch((error) => {
    return error;
  });

module.exports = loanTable;
