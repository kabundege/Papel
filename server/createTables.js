import pool from "./config/dbConfig";

const table = `DROP TABLE IF EXISTS users,transactions,accounts CASCADE;
    CREATE TABLE users (
      userid UUID PRIMARY KEY,
      firstname VARCHAR(40) NOT NULL,
      lastname VARCHAR(40) ,
      email TEXT UNIQUE,
      password TEXT ,
      type VARCHAR(40) default 'client',
      isadmin BOOLEAN default 'false',
      googleid VARCHAR(100),
      githubid VARCHAR(100),
      facebookid VARCHAR(100) 
    );
    insert into users values ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed','kabundege','kwizera','kabundege2@outlook.com','$2a$10$pVqBtKRnH9QSsblCCPIK4uyWstH8EupqTDAhQStzw/q4S7OHUhAFK','staff',true,' ',' ',' ');
    CREATE TABLE accounts (
      accid UUID NOT NULL PRIMARY KEY,
      accountnumber BIGINT NOT NULL UNIQUE,
      createdon TIMESTAMP DEFAULT NOW(),
      owner UUID NOT NULL,
      type VARCHAR(40) NOT NULL,
      status VARCHAR(40) default 'active',
      balance INT NOT NULL,
      FOREIGN KEY (owner) REFERENCES users(userid) ON DELETE CASCADE
    );
    CREATE TABLE transactions (
      transid UUID NOT NULL PRIMARY KEY,
      createdon TIMESTAMP DEFAULT NOW(),
      type VARCHAR(40) NOT NULL,
      accountnumber BIGINT NOT NULL,
      FOREIGN KEY (accountnumber) REFERENCES accounts(accountnumber) ON DELETE CASCADE,
      cashier UUID NOT NULL,
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
