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
      firstName: _joi2.default.string().required().min(3).max(40).trim().pattern(/^[a-zA-Z]+$/),
      lastName: _joi2.default.string().required().min(3).max(40).trim().regex(/^[a-zA-Z]+$/),
      email: _joi2.default.string().email().required().trim(),
      password: _joi2.default.string().required().min(5).trim(),
      confirmPassword: _joi2.default.string().required().min(5).trim(),
      type: _joi2.default.string().trim().required().default('client'),
      isAdmin: _joi2.default.boolean().strict().required().default(false)
    });

    return schema.validate(user, {
      abortEarly: false
    });
  }

  static signup(user) {
    const schema = _joi2.default.object().keys({
      firstName: _joi2.default.string().required().min(3).max(40).trim().pattern(/^[a-zA-Z]+$/),
      lastName: _joi2.default.string().required().min(3).max(40).trim().regex(/^[a-zA-Z]+$/),
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

  static email(user) {
    const schema = _joi2.default.object().keys({
      email: _joi2.default.string().email().required().trim()
    });

    return schema.validate(user, {
      abortEarly: false
    });
  }

  static reset(user) {
    const schema = _joi2.default.object().keys({
      password: _joi2.default.string().required().trim(),
      confirmPassword: _joi2.default.string().required().trim()
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