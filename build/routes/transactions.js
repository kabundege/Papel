"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _transController = require("../controllers/transController");

var _transController2 = _interopRequireDefault(_transController);

var _auth = require("../middleware/auth");

var _auth2 = _interopRequireDefault(_auth);

var _transactions = require("../middleware/transactions");

var _transactions2 = _interopRequireDefault(_transactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = _express2.default.Router();

route.get('/api/v1/transaction/:transid', _auth2.default.access, _transController2.default.specificTrans);
route.get('/api/v1/:accountnumber/transactions', _auth2.default.access, _transController2.default.userTrans);
route.post('/api/v1/transaction/:accountnumber/credit', _auth2.default.access, _transactions2.default.trans, _transController2.default.credit);
route.post('/api/v1/transaction/:accountnumber/debit', _auth2.default.access, _transactions2.default.trans, _transController2.default.debit);
exports.default = route;