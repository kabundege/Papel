"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _dbMethods = require("../helpers/dbMethods");

var _dbMethods2 = _interopRequireDefault(_dbMethods);

var _responseHandler = require("../helpers/responseHandler");

var _responseHandler2 = _interopRequireDefault(_responseHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class auth {
  static async access(req, res, next) {
    const token = req.header("token");

    if (!token) {
      _responseHandler2.default.error(401, new Error("no token provided"));

      return _responseHandler2.default.send(res);
    }

    try {
      const decoded = _jsonwebtoken2.default.verify(token, process.env.JWTPRIVATEKEY);

      req.user = decoded;
      let author = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

      if (!author['0']) {
        _responseHandler2.default.error(401, new Error('Token has expired'));

        return _responseHandler2.default.send(res);
      }

      next();
    } catch (ex) {
      _responseHandler2.default.error(401, new Error("token unAuthorized"));

      return _responseHandler2.default.send(res);
    }
  }

}

exports.default = auth;