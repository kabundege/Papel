"use strict";

var _chai = require("chai");

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require("chai-http");

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

require("chai/register-should");

var _app = require("../app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  expect
} = _chai2.default;

_chai2.default.use(_chaiHttp2.default);

describe('users can signup', () => {
  it('it should return validation error', done => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
      email: 'john45@gmail.com',
      type: 'client',
      isadmin: 'false'
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return confirm password error', done => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
      email: 'john45@gmail.com',
      password: 'kwizera',
      confirmPassword: 'inhgfdka'
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      expect(res.statusCode).to.equal(409);
      done();
    });
  });
  it('it should return account created', done => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
      email: 'john45@gmail.com',
      password: 'kwizera',
      confirmPassword: 'kwizera',
      type: 'client',
      isadmin: false
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      expect(res.statusCode).to.equal(201);
      done();
    });
  });
  it('it should return account already exits', done => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
      email: 'john45@gmail.com',
      password: 'kwizera',
      confirmPassword: 'kwizera',
      type: 'client',
      isadmin: false
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      expect(res.statusCode).to.equal(409);
      done();
    });
  });
  it('it should validation error', done => {
    const user = {
      email: 'john45gmail.com',
      password: 'kwizera'
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(user).end((err, res) => {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('it should Login successfuly', done => {
    const user = {
      email: 'john45@gmail.com',
      password: 'kwizera'
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(user).end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('it should return incorect password', done => {
    const user = {
      email: 'john45@gmail.com',
      password: 'kwizer4567a'
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(user).end((err, res) => {
      expect(res.status).to.equal(400);
      done();
    });
  });
  it('it should User not found', done => {
    const user = {
      email: 'isac@gmail.com',
      password: 'kwizera'
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(user).end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
  });
});