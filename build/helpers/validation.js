"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require("@hapi/joi");

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserValidator {
  static admin(user) {
    const schema = _joi2.default.object().keys({
      firstname: _joi2.default.string().required().min(3).max(40).trim().pattern(/^[a-zA-Z]+$/),
      lastname: _joi2.default.string().required().min(3).max(40).trim().regex(/^[a-zA-Z]+$/),
      email: _joi2.default.string().email().required().trim(),
      password: _joi2.default.string().required().min(5).trim(),
      confirmPassword: _joi2.default.string().required().min(5).trim(),
      type: _joi2.default.string().trim().default('client'),
      isadmin: _joi2.default.boolean().strict().default(false)
    });

    return schema.validate(user, {
      abortEarly: false
    });
  }

  static signup(user) {
    const schema = _joi2.default.object().keys({
      firstname: _joi2.default.string().required().min(3).max(40).trim().pattern(/^[a-zA-Z]+$/),
      lastname: _joi2.default.string().required().min(3).max(40).trim().regex(/^[a-zA-Z]+$/),
      email: _joi2.default.string().email().required().trim(),
      password: _joi2.default.string().required().min(5).trim(),
      confirmPassword: _joi2.default.string().required().min(5).trim()
    });

    return schema.validate(user, {
      abortEarly: false
    });
  }

  static signin(user) {
    const schema = _joi2.default.object().keys({
      email: _joi2.default.string().email().required().trim(),
      password: _joi2.default.string().required().trim()
    });

    return schema.validate(user, {
      abortEarly: false
    });
  }

  static createAcc(user) {
    const schema = _joi2.default.object().keys({
      type: _joi2.default.string().required().trim()
    });

    return schema.validate(user, {
      abortEarly: false
    });
  }

  static status(user) {
    const schema = _joi2.default.object().keys({
      status: _joi2.default.string().required().trim()
    });

    return schema.validate(user, {
      abortEarly: false
    });
  }

  static trans(user) {
    const schema = _joi2.default.object().keys({
      amount: _joi2.default.number().min(1).required()
    });

    return schema.validate(user, {
      abortEarly: false
    });
  }

}

exports.default = UserValidator;