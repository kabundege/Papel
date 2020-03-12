"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require("pg");

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

const connectionString = process.env.DATABASE_URL;
const pool = new _pg.Pool({
  connectionString
}); // pool.on('connect', () => process.stdout.write('server connected'));

exports.default = pool;