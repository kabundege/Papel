"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dbConfig = require("./config/dbConfig");

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    insert into users values ('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed','christope','kwizera','kabundege@gmail.com','$2a$10$pVqBtKRnH9QSsblCCPIK4uyWstH8EupqTDAhQStzw/q4S7OHUhAFK','staff',true);
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
    await _dbConfig2.default.query(table);
    console.log(' table created');
  } catch (err) {
    console.log(err);
  }
};

createTable();
exports.default = createTable;