"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _userController = require("../controllers/userController");

var _userController2 = _interopRequireDefault(_userController);

var _uservalidation = require("../middleware/uservalidation");

var _uservalidation2 = _interopRequireDefault(_uservalidation);

var _accountValidation = require("../middleware/accountValidation");

var _accountValidation2 = _interopRequireDefault(_accountValidation);

var _auth = require("../middleware/auth");

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = _express2.default.Router();

route.post("/api/v1/auth/signup", _uservalidation2.default.signup, _userController2.default.signup);
route.patch("/api/v1/auth/reset", _auth2.default.reset, _uservalidation2.default.reset, _userController2.default.reset);
route.get("/api/v1/auth/reset", (req, res) => {
  res.sendFile('reset.html', {
    root: './ui/html'
  });
});
route.post("/api/v1/auth/email", _uservalidation2.default.email, _userController2.default.email);
route.post("/api/v1/auth/signup/admin", _auth2.default.access, _uservalidation2.default.admin, _userController2.default.admin);
route.post("/api/v1/auth/signin", _uservalidation2.default.signin, _userController2.default.signin);
route.post("/api/v1/user/account", _auth2.default.access, _accountValidation2.default.createAcc, _userController2.default.createAcc);
route.get("/api/v1/user/:email/accounts", _auth2.default.access, _userController2.default.AllAcc);
exports.default = route;