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

describe('Accounts Test', () => {
  let token;
  let token2;
  let accountNumber;
  let oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxZjZkMGJlNS0xOTFiLTRhMTItOGMzOC01ODJhZjA0NjBmODgiLCJpYXQiOjE1ODE4MDI2MDJ9.8-IGTb-E62kIxdT-L7RGgZTI923MU7kHoNbwPjNwQcs';
  it('it should return account created', done => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
      email: 'kwizera@gmail.com',
      password: 'kwizera',
      confirmPassword: 'kwizera',
      type: 'staff',
      isadmin: true
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      expect(res.statusCode).to.equal(201);
      done();
    });
  });
  it('it should return account created', done => {
    const newUser = {
      firstname: 'kabundege',
      lastname: 'kwizera',
      email: 'christophe@gmail.com',
      password: 'kwizera',
      confirmPassword: 'kwizera'
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signup').send(newUser).end((err, res) => {
      expect(res.statusCode).to.equal(201);
      done();
    });
  });
  it('login successful', done => {
    const loggedUser = {
      email: 'kwizera@gmail.com',
      password: 'kwizera'
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(loggedUser).end((err, res) => {
      token2 = res.body.data.token;
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('login successful', done => {
    const loggedUser = {
      email: 'christophe@gmail.com',
      password: 'kwizera'
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(loggedUser).end((err, res) => {
      token = res.body.data.token;
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('it should no token ', done => {
    const newAcc = {
      openingbalance: 897657
    };

    _chai2.default.request(_app2.default).post('/api/v1/account').send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
  it('it should validation error', done => {
    const newAcc = {
      openingbalance: 897657,
      type: 'giveme'
    };

    _chai2.default.request(_app2.default).post('/api/v1/account').set('token', token).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should validation error', done => {
    const newAcc = {
      openingbalance: 897657
    };

    _chai2.default.request(_app2.default).post('/api/v1/account').set('token', token).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should ALL Accounts ', done => {
    _chai2.default.request(_app2.default).get('/api/v1/accounts').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should No accounts found ', done => {
    _chai2.default.request(_app2.default).get('/api/v1/accounts').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should Accounts created', done => {
    const newAcc = {
      openingbalance: 897657,
      type: 'saving'
    };

    _chai2.default.request(_app2.default).post('/api/v1/account').set('token', token2).send(newAcc).end((err, res) => {
      accountNumber = res.body.data.accountnumber;
      expect(res.statusCode).to.equal(201);
      done();
    });
  });
  it('it should Accounts token error', done => {
    const newAcc = {
      openingbalance: 897657,
      type: 'saving'
    };

    _chai2.default.request(_app2.default).post('/api/v1/account').set('token', 'sdfghjhsgfwdvwsqsqdecvfvfv').send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
  it('it should Accounts created', done => {
    const newAcc = {
      openingbalance: 897657,
      type: 'saving'
    };

    _chai2.default.request(_app2.default).post('/api/v1/account').set('tokehsn', token2).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
  it('it should return invalid Email ', done => {
    _chai2.default.request(_app2.default).get('/api/v1/user/isacgmailcom/accounts').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return Email not found', done => {
    _chai2.default.request(_app2.default).get('/api/v1/user/isac@gmail.com/accounts').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should return Email not found', done => {
    _chai2.default.request(_app2.default).get('/api/v1/user/john@gmail.com/accounts').set('tok', token2).end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
  it('it should return token error', done => {
    _chai2.default.request(_app2.default).get('/api/v1/user/john@gmail.com/accounts').set('token', 'sdfghjhgf').end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
  it('it should return No Accounts Found on the Email', done => {
    _chai2.default.request(_app2.default).get('/api/v1/user/christophe@gmail.com/accounts').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should return no access', done => {
    _chai2.default.request(_app2.default).get('/api/v1/user/kwizera@gmail.com/accounts').set('token', token).end((err, res) => {
      expect(res.statusCode).to.equal(403);
      done();
    });
  });
  it('it should return no access', done => {
    _chai2.default.request(_app2.default).get('/api/v1/user/kwizera@gmail.com/accounts').set('token', oldToken).end((err, res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
  it('it should Email accounts', done => {
    _chai2.default.request(_app2.default).get('/api/v1/user/kwizera@gmail.com/accounts').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('it should No Access', done => {
    _chai2.default.request(_app2.default).get('/api/v1/accounts').set('token', token).end((err, res) => {
      expect(res.statusCode).to.equal(403);
      done();
    });
  });
  it('it should ALL Accounts ', done => {
    _chai2.default.request(_app2.default).get('/api/v1/accounts').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('it should return no access', done => {
    _chai2.default.request(_app2.default).get('/api/v1/accounts/3456789').set('token', token).end((err, res) => {
      expect(res.statusCode).to.equal(403);
      done();
    });
  });
  it('it should return params error', done => {
    _chai2.default.request(_app2.default).get('/api/v1/accounts/345jhgd').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return no Account found', done => {
    _chai2.default.request(_app2.default).get('/api/v1/accounts/3454567').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should return a specific account', done => {
    _chai2.default.request(_app2.default).get(`/api/v1/accounts/${accountNumber}`).set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('it should return No access', done => {
    const payload = {
      status: "active"
    };

    _chai2.default.request(_app2.default).patch(`/api/v1/account/${accountNumber}`).set('token', token).send(payload).end((err, res) => {
      expect(res.statusCode).to.equal(403);
      done();
    });
  });
  it('it should return body validation', done => {
    const payload = {};

    _chai2.default.request(_app2.default).patch(`/api/v1/account/${accountNumber}`).set('token', token2).send(payload).end((err, res) => {
      console.log(err);
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return Invalid Params', done => {
    const payload = {
      status: "active"
    };

    _chai2.default.request(_app2.default).patch('/api/v1/account/4dfgh56').set('token', token2).send(payload).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return input error', done => {
    const payload = {
      status: "sdfgh"
    };

    _chai2.default.request(_app2.default).patch(`/api/v1/account/${accountNumber}`).set('token', token2).send(payload).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return account not found', done => {
    const payload = {
      status: "active"
    };

    _chai2.default.request(_app2.default).patch('/api/v1/account/9843').set('token', token2).send(payload).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should return createria added successfuly', done => {
    const payload = {
      status: "active"
    };

    _chai2.default.request(_app2.default).patch(`/api/v1/account/${accountNumber}`).set('token', token2).send(payload).end((err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('it should return No access', done => {
    _chai2.default.request(_app2.default).delete('/api/v1/accounts/567889').set('token', token).end((err, res) => {
      expect(res.statusCode).to.equal(403);
      done();
    });
  });
  it('it should return invalid params', done => {
    _chai2.default.request(_app2.default).delete('/api/v1/accounts/fdhf876').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return delete not found', done => {
    _chai2.default.request(_app2.default).delete('/api/v1/accounts/567889').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should return delete successfuly', done => {
    _chai2.default.request(_app2.default).delete(`/api/v1/accounts/${accountNumber}`).set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('it should return No Access', done => {
    _chai2.default.request(_app2.default).get('/api/v1/account?status=active').set('token', token).end((err, res) => {
      expect(res.statusCode).to.equal(403);
      done();
    });
  });
  it('it should return Not Found', done => {
    _chai2.default.request(_app2.default).get('/api/v1/account?status=dormant').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should Accounts created', done => {
    const newAcc = {
      openingbalance: 897657,
      type: 'saving'
    };

    _chai2.default.request(_app2.default).post('/api/v1/account').set('token', token2).send(newAcc).end((err, res) => {
      accountNumber = res.body.data.accountnumber;
      expect(res.statusCode).to.equal(201);
      done();
    });
  });
  it('it should return fetch was successful', done => {
    _chai2.default.request(_app2.default).get('/api/v1/account?status=active').set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});