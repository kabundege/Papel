"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _v = require("uuid/v4");

var _v2 = _interopRequireDefault(_v);

var _randomInt = require("random-int");

var _randomInt2 = _interopRequireDefault(_randomInt);

var _emailValidator = require("email-validator");

var _emailValidator2 = _interopRequireDefault(_emailValidator);

var _tokenProvider = require("../helpers/tokenProvider");

var _tokenProvider2 = _interopRequireDefault(_tokenProvider);

var _responseHandler = require("../helpers/responseHandler");

var _responseHandler2 = _interopRequireDefault(_responseHandler);

var _dbMethods = require("../helpers/dbMethods");

var _dbMethods2 = _interopRequireDefault(_dbMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class userController {
  static async signup(req, res) {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      type,
      isadmin
    } = req.body;

    if (password != confirmPassword) {
      _responseHandler2.default.error(409, new Error('UnMaching Password'));

      return _responseHandler2.default.send(res);
    }

    const userid = (0, _v2.default)();
    const signupUser = await _dbMethods2.default.select("*", "users", `email='${email}'`);

    if (signupUser['0']) {
      _responseHandler2.default.error(409, new Error('user Already exists'));

      return _responseHandler2.default.send(res);
    }

    const hashedPassword = await _bcryptjs2.default.hash(password, 10);
    const newUser = await _dbMethods2.default.insert('users', 'userid,firstname,lastname,email,password,type,isadmin', '$1,$2,$3,$4,$5,$6,$7', [userid, firstname.trim(), lastname.trim(), email.trim(), hashedPassword, type, isadmin], 'userid,firstname,lastname,email');
    const token = (0, _tokenProvider2.default)({
      userid: newUser.userid
    });

    _responseHandler2.default.successful(201, 'user created successful', {
      token,
      user: newUser
    });

    return _responseHandler2.default.send(res);
  }

  static async signin(req, res) {
    const {
      email,
      password
    } = req.body;
    const loginUser = await _dbMethods2.default.select("*", "users", `email='${email}'`);

    if (!loginUser['0']) {
      _responseHandler2.default.error(404, new Error("incorrect credentials"));

      return _responseHandler2.default.send(res);
    }

    if (!(await _bcryptjs2.default.compare(password, loginUser['0'].password))) {
      _responseHandler2.default.error(400, new Error("incorrect credentials"));

      return _responseHandler2.default.send(res);
    }

    const token = (0, _tokenProvider2.default)({
      userid: loginUser['0'].userid
    });

    _responseHandler2.default.successful(200, "User logged in successfully", {
      token,
      id: loginUser["0"].userid,
      firstName: loginUser["0"].firstname,
      lastName: loginUser["0"].lastname,
      email: loginUser["0"].email
    });

    return _responseHandler2.default.send(res);
  }

  static async createAcc(req, res) {
    const {
      openingbalance,
      type
    } = req.body;
    let accnumber = (0, _randomInt2.default)(10000000, 1000000000);
    const accid = (0, _v2.default)();

    if (type !== 'saving' && type !== 'current') {
      _responseHandler2.default.error(400, new Error('the  type must be saving or current'));

      return _responseHandler2.default.send(res);
    }

    const user = await _dbMethods2.default.select("*", "users", `userid='${req.user.userid}'`);
    const newAcc = await _dbMethods2.default.insert("accounts", "accid,accountnumber,owner,type,balance", "$1,$2,$3,$4,$5", [accid, accnumber, user['0'].userid, type, 0], "accountnumber,type,balance");

    _responseHandler2.default.successful(201, "user created successful", {
      accountnumber: newAcc.accountnumber,
      firstName: user["0"].firstname,
      lastName: user["0"].lastname,
      type: newAcc.type,
      openingbalance: newAcc.balance
    });

    return _responseHandler2.default.send(res);
  }

  static async AllAcc(req, res) {
    let email = req.params.email;
    let author = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

    if (!author['0'].isadmin && author['0'].type !== "staff") {
      _responseHandler2.default.error(403, new Error('No Access'));

      return _responseHandler2.default.send(res);
    }

    if (!_emailValidator2.default.validate(email)) {
      _responseHandler2.default.error(400, new Error("Invalid email type"));

      return _responseHandler2.default.send(res);
    }

    const user = await _dbMethods2.default.select('*', 'users', `email='${email}'`);

    if (!user['0']) {
      _responseHandler2.default.error(404, new Error("Email not Found"));

      return _responseHandler2.default.send(res);
    }

    const Acc = await _dbMethods2.default.select('*', 'accounts', `owner='${user['0'].userid}'`);

    if (!Acc['0']) {
      _responseHandler2.default.error(404, new Error("No Account Found"));

      return _responseHandler2.default.send(res);
    }

    _responseHandler2.default.successful(200, "Account Fetch successful", {
      data: Acc
    });

    return _responseHandler2.default.send(res);
  }

}

exports.default = userController;