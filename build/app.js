"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _user = require("./routes/user");

var _user2 = _interopRequireDefault(_user);

var _staff = require("./routes/staff");

var _staff2 = _interopRequireDefault(_staff);

var _transactions = require("./routes/transactions");

var _transactions2 = _interopRequireDefault(_transactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
  extended: true
}));
app.use('/', _user2.default);
app.use('/', _staff2.default);
app.use('/', _transactions2.default);
exports.default = app;