"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

const tokenProvider = user => _jsonwebtoken2.default.sign(user, process.env.JWTPRIVATEKEY);

exports.default = tokenProvider;