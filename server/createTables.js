import pool from "./config/dbConfig";

const table = `DROP TABLE IF EXISTS users,transactions,accounts CASCADE;
    CREATE TABLE users (
      userid UUID NOT NULL PRIMARY KEY,
      firstname VARCHAR(40) NOT NULL,
      lastname VARCHAR(40) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      type VARCHAR(40) default 'client',
      isadmin BOOLEAN default 'false' 
    );
    CREATE TABLE accounts (
      accid UUID NOT NULL PRIMARY KEY,
      accountnumber BIGINT NOT NULL UNIQUE,
      createdon TIMESTAMP DEFAULT NOW(),
      owner UUID NOT NULL,
      type VARCHAR(40) NOT NULL,
      status VARCHAR(40) default 'draft',
      balance INT NOT NULL,
      FOREIGN KEY (owner) REFERENCES users(userid)
    );
    CREATE TABLE transactions (
      transid UUID NOT NULL PRIMARY KEY,
      createdon TIMESTAMP DEFAULT NOW(),
      type VARCHAR(40) NOT NULL,
      accountnumber BIGINT NOT NULL,
      FOREIGN KEY (accountnumber) REFERENCES accounts(accountnumber),
      cashier INT NOT NULL,
      amount FLOAT NOT NULL,
      oldbalance FLOAT NOT NULL,
      newbalance FLOAT NOT NULL
    );`;
const createTable = async () => {
  try {
    await pool.query(table);
    console.log(' table created');
  } catch (err) {
    console.log(err);
  }
};

createTable();

export default createTable;
