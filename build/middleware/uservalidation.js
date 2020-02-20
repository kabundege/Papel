"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validation = require("../helpers/validation");

var _validation2 = _interopRequireDefault(_validation);

var _responseHandler = require("../helpers/responseHandler");

var _responseHandler2 = _interopRequireDefault(_responseHandler);

var _error = require("../helpers/error");

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class userValidatorMid {
  static signup(req, res, next) {
    const {
      error
    } = _validation2.default.signup(req.body);

    if (error) {
      const newMessage = (0, _error2.default)(error);

      _responseHandler2.default.error(400, new Error(newMessage));

      return _responseHandler2.default.send(res);
    }

    return next();
  }

  static admin(req, res, next) {
    const {
      error
    } = _validation2.default.admin(req.body);

    if (error) {
      const newMessage = (0, _error2.default)(error);

      _responseHandler2.default.error(400, new Error(newMessage));

      return _responseHandler2.default.send(res);
    }

    return next();
  }

  static signin(req, res, next) {
    const {
      error
    } = _validation2.default.signin(req.body);

    if (error) {
      const newMessage = (0, _error2.default)(error);

      _responseHandler2.default.error(400, new Error(newMessage));

      return _responseHandler2.default.send(res);
    }

    return next();
  }

}

exports.default = userValidatorMid;