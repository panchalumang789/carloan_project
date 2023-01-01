const { dbConnect } = require("../config/dbConnection");

const userTable = dbConnect
  .query(
    `CREATE TABLE IF NOT EXISTS users(
        id SERIAL NOT NULL PRIMARY KEY,
        status VARCHAR(20) NOT NULL,
        income INTEGER NOT NULL,
        contactNo BIGINT NOT NULL UNIQUE,
        firstName VARCHAR(20) NOT NULL ,
        lastName VARCHAR(20) NOT NULL ,
        gender VARCHAR(6) NOT NULL,
        email VARCHAR(30) NOT NULL UNIQUE,
        state VARCHAR(30) NOT NULL,
        medicalcardImage VARCHAR(100) NOT NULL UNIQUE,
        licenceFname VARCHAR(20) NOT NULL ,
        licenceLname VARCHAR(20) NOT NULL ,
        licenceNumber VARCHAR(20) UNIQUE,
        licenceType VARCHAR(10) NOT NULL,
        licenceExpireDate,
        licenceIssueDate,
        licenceBackImage VARCHAR(100) NOT NULL UNIQUE,
        licenceFrontImage VARCHAR(100) NOT NULL UNIQUE,
        createdAt TIMESTAMP
    )`
  )
  .then((result) => {
    return result;
  })
  .catch((error) => {
    return error;
  });

module.exports = userTable;
