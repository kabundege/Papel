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

describe('Transaction Test', () => {
  let token;
  let token2;
  let transactionId;
  let accountNumber;
  it('admin login successful', done => {
    const loggedUser = {
      email: 'kwizera@gmail.com',
      password: 'aPassword123!'
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(loggedUser).end((err, res) => {
      token2 = res.body.data.token;
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('user login successful', done => {
    const loggedUser = {
      email: 'christophe@gmail.com',
      password: 'aPassword123!'
    };

    _chai2.default.request(_app2.default).post('/api/v1/auth/signin').send(loggedUser).end((err, res) => {
      token = res.body.data.token;
      expect(res.status).to.equal(200);
      done();
    });
  });
  it('it should return Accounts created', done => {
    const newAcc = {
      type: 'saving'
    };

    _chai2.default.request(_app2.default).post('/api/v1/account').set('token', token2).send(newAcc).end((err, res) => {
      accountNumber = res.body.data.accountnumber * 1;
      expect(res.statusCode).to.equal(201);
      done();
    });
  });
  it('it should return No Access', done => {
    const newAcc = {
      amount: 89
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/${accountNumber}/debit`).set('token', token).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(403);
      done();
    });
  });
  it('it should return amount must be number', done => {
    const newAcc = {
      amount: '89'
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/${accountNumber}/debit`).set('token', token).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return params must be number', done => {
    const newAcc = {
      amount: 89
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/'${accountNumber}'/debit`).set('token', token).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return amount must be number', done => {
    const newAcc = {
      amount: '89'
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/${accountNumber}/credit`).set('token', token).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return params must be number', done => {
    const newAcc = {
      amount: 89
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/'${accountNumber}'/credit`).set('token', token).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return validation error', done => {
    const newAcc = {
      amount: 'fghj'
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/3456/debit`).set('token', token2).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return params error', done => {
    const newAcc = {
      amount: 0
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/345gfds6/debit`).set('token', token2).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return account not found', done => {
    const newAcc = {
      amount: 89
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/3456/debit`).set('token', token2).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should return insufficient Amount', done => {
    const newAcc = {
      amount: 3478987
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/${accountNumber}/debit`).set('token', token2).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(406);
      done();
    });
  });
  it('it should return No Access', done => {
    const newAcc = {
      amount: 678
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/${accountNumber}/credit`).set('token', token).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(403);
      done();
    });
  });
  it('it should return validation error', done => {
    const newAcc = {
      amount: ''
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/3456/credit`).set('token', token2).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return params error', done => {
    const newAcc = {
      amount: 0
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/345gfds6/credit`).set('token', token2).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return account not found', done => {
    const newAcc = {
      amount: 43
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/3456/credit`).set('token', token2).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should return Account cretdited', done => {
    const newAcc = {
      amount: 600
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/${accountNumber}/credit`).set('token', token2).send(newAcc).end((err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('it should return Accounts created', done => {
    const newAcc = {
      amount: 200
    };

    _chai2.default.request(_app2.default).post(`/api/v1/transaction/${accountNumber}/debit`).set('token', token2).send(newAcc).end((err, res) => {
      transactionId = res.body.data.transactionId;
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('it should return params error', done => {
    _chai2.default.request(_app2.default).get(`/api/v1/ghh787/transactions`).set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  it('it should return not found', done => {
    _chai2.default.request(_app2.default).get(`/api/v1/4567/transactions`).set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should return fetch successful', done => {
    _chai2.default.request(_app2.default).get(`/api/v1/${accountNumber}/transactions`).set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
  it('it should return fetch successful', done => {
    _chai2.default.request(_app2.default).get(`/api/v1/transaction/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed`).set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('it should return fetch successful', done => {
    _chai2.default.request(_app2.default).get(`/api/v1/transaction/${transactionId}`).set('token', token2).end((err, res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});