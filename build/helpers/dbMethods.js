"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dbConfig = require("../config/dbConfig");

var _dbConfig2 = _interopRequireDefault(_dbConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Dbmethods {
  static async select(columns, table, condition) {
    let query;

    if (condition === undefined) {
      query = `SELECT ${columns} FROM ${table};`;
    } else {
      query = `SELECT ${columns} FROM ${table} WHERE ${condition};`;
    }

    const {
      rows
    } = await _dbConfig2.default.query(query);
    return rows;
  }

  static async insert(table, columns, params, data, returns) {
    const query = `INSERT INTO ${table} (${columns}) values (${params}) RETURNING ${returns};`;
    const {
      rows
    } = await _dbConfig2.default.query(query, data);
    return rows['0'];
  }

  static async update(table, data, condition, returns) {
    const query = `UPDATE ${table} SET ${data} WHERE ${condition} RETURNING ${returns};`;
    const {
      rows
    } = await _dbConfig2.default.query(query);
    return rows['0'];
  }

  static async delete(table, condition) {
    const query = `DELETE FROM ${table} WHERE ${condition} RETURNING *`;
    const {
      rows
    } = await _dbConfig2.default.query(query);
    return rows['0'];
  }

}

exports.default = Dbmethods;