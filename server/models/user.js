const dbConnect = require("../config/db.connection");
const userTable = dbConnect
  .query(
    `CREATE TABLE IF NOT EXISTS users(
        id SERIAL,
        status VARCHAR(20) NOT NULL,
        income INTEGER NOT NULL,
        contactNo VARCHAR(10) NOT NULL,
        prefix VARCHAR(6) NOT NULL,
        firstName VARCHAR(20) NOT NULL ,
        lastName VARCHAR(20) NOT NULL ,
        gender VARCHAR(6) NOT NULL,
        email VARCHAR(30) NOT NULL,
        state VARCHAR(30) NOT NULL,
        medicalcardImage VARCHAR(100) NOT NULL,
        licenceFname VARCHAR(20) NOT NULL ,
        licenceLname VARCHAR(20) NOT NULL ,
        licenceNumber VARCHAR(20),
        licenceType VARCHAR(10) NOT NULL,
        licenceExpireDate VARCHAR[],
        licenceIssueDate  VARCHAR[],
        licenceBackImage VARCHAR(100) NOT NULL,
        licenceFrontImage VARCHAR(100) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT (now()),
        updated_at TIMESTAMPTZ DEFAULT (now()),
        PRIMARY KEY (id),
        CHECK (income > 0),
        UNIQUE (contactNo ,email ,medicalcardImage ,licenceNumber ,licenceBackImage ,licenceFrontImage)
    )`
  )
  .then((result) => {
    return result;
  })
  .catch((error) => {
    return error;
  });

module.exports = userTable;
