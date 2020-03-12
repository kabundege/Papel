"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _staffController = require("../controllers/staffController");

var _staffController2 = _interopRequireDefault(_staffController);

var _auth = require("../middleware/auth");

var _auth2 = _interopRequireDefault(_auth);

var _accountValidation = require("../middleware/accountValidation");

var _accountValidation2 = _interopRequireDefault(_accountValidation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = _express2.default.Router();

route.get("/api/v1/accounts", _auth2.default.access, _staffController2.default.accounts);
route.get("/api/v1/user/accounts/:accountNumber", _auth2.default.access, _staffController2.default.specificAccount);
route.get("/api/v1/account?:params", _auth2.default.access, _staffController2.default.createriaAccounts);
route.patch("/api/v1/account/:accountNumber", _auth2.default.access, _accountValidation2.default.status, _staffController2.default.activateDeactivate);
route.delete("/api/v1/accounts/:accounteNumber", _auth2.default.access, _staffController2.default.Erase);
exports.default = route;