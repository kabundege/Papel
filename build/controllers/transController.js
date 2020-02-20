"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require("uuid/v4");

var _v2 = _interopRequireDefault(_v);

var _mailer = require("../helpers/mailer");

var _mailer2 = _interopRequireDefault(_mailer);

var _responseHandler = require("../helpers/responseHandler");

var _responseHandler2 = _interopRequireDefault(_responseHandler);

var _dbMethods = require("../helpers/dbMethods");

var _dbMethods2 = _interopRequireDefault(_dbMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class staffController {
  static async debit(req, res) {
    const {
      amount
    } = req.body;
    const id = req.params.accountnumber;
    const uuid = (0, _v2.default)();

    if (typeof amount !== 'number') {
      _responseHandler2.default.error(400, new Error('The Amount Must Be A Number'));

      return _responseHandler2.default.send(res);
    }

    if (isNaN(id)) {
      _responseHandler2.default.error(400, new Error('The Account Number Must Be A Number'));

      return _responseHandler2.default.send(res);
    }

    let user = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

    if (user['0'].type !== "staff") {
      _responseHandler2.default.error(403, new Error('No Access'));

      return _responseHandler2.default.send(res);
    }

    const userAcc = await _dbMethods2.default.select('*', 'accounts', `accountnumber='${id}'`);

    if (!userAcc['0']) {
      _responseHandler2.default.error(404, new Error('Account Not Found'));

      return _responseHandler2.default.send(res);
    }

    if (userAcc['0'].balance < amount) {
      _responseHandler2.default.error(406, new Error('insufficient Amount'));

      return _responseHandler2.default.send(res);
    }

    let newAmount = userAcc['0'].balance - amount;
    const trans = await _dbMethods2.default.insert('transactions', 'transid,type,accountnumber,cashier,amount,oldbalance,newbalance', "$1,$2,$3,$4,$5,$6,$7", [uuid, 'debit', id, req.user.userid, amount, userAcc['0'].balance, newAmount], '*');

    _mailer2.default.main({
      transactionId: trans.transid,
      accountNumber: id,
      cashier: req.user.userid,
      transactionType: 'debit',
      accountBalance: newAmount
    });

    const Acc = await _dbMethods2.default.update('accounts', `balance='${newAmount}',status='active'`, `accountnumber='${id}'`, '*');

    _responseHandler2.default.successful(200, 'Debit Done successfuly', {
      transactionId: trans.transid,
      accountNumber: id,
      cashier: req.user.userid,
      transactionType: 'debit',
      accountBalance: newAmount
    });

    return _responseHandler2.default.send(res);
  }

  static async credit(req, res) {
    const {
      amount
    } = req.body;
    const id = req.params.accountnumber;
    const uuid = (0, _v2.default)();

    if (typeof amount !== 'number') {
      _responseHandler2.default.error(400, new Error('The Amount Must Be A Number'));

      return _responseHandler2.default.send(res);
    }

    if (isNaN(id)) {
      _responseHandler2.default.error(400, new Error('The Account Number Must Be A Number'));

      return _responseHandler2.default.send(res);
    }

    let user = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

    if (user['0'].type !== "staff") {
      _responseHandler2.default.error(403, new Error('No Access'));

      return _responseHandler2.default.send(res);
    }

    const userAcc = await _dbMethods2.default.select('*', 'accounts', `accountnumber='${id}'`);

    if (!userAcc['0']) {
      _responseHandler2.default.error(404, new Error('Account Not Found'));

      return _responseHandler2.default.send(res);
    }

    let newAmount = userAcc['0'].balance + amount;
    const trans = await _dbMethods2.default.insert('transactions', 'transid,type,accountnumber,cashier,amount,oldbalance,newbalance', "$1,$2,$3,$4,$5,$6,$7", [uuid, 'debit', id, req.user.userid, amount, userAcc['0'].balance, newAmount], '*');

    _mailer2.default.main(user['0'], {
      transactionId: trans.transid,
      accountNumber: id,
      cashier: req.user.userid,
      transactionType: 'debit',
      accountBalance: newAmount
    });

    const Acc = await _dbMethods2.default.update('accounts', `balance='${newAmount}',status='active'`, `accountnumber='${id}'`, '*');

    _responseHandler2.default.successful(200, 'Debit Done successfuly', {
      transactionId: trans.transid,
      accountNumber: id,
      cashier: req.user.userid,
      transactionType: 'debit',
      accountBalance: newAmount
    });

    return _responseHandler2.default.send(res);
  }

  static async userTrans(req, res) {
    const AccNumber = req.params.accountnumber;
    let user = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

    if (isNaN(AccNumber)) {
      _responseHandler2.default.error(400, new Error('the AccountNumber Must Be A Number '));

      return _responseHandler2.default.send(res);
    }

    const transcs = await _dbMethods2.default.select('*', 'transactions', `accountnumber='${AccNumber}'`);

    if (!transcs['0']) {
      _responseHandler2.default.error(404, new Error('No Transaction Found'));

      return _responseHandler2.default.send(res);
    }

    _responseHandler2.default.successful(200, 'Transaction fetch successful', {
      data: transcs
    });

    return _responseHandler2.default.send(res);
  }

  static async specificTrans(req, res) {
    const id = req.params.transid;
    const trans = await _dbMethods2.default.select('*', 'transactions', `transid='${id}'`);

    if (!trans['0']) {
      _responseHandler2.default.error(404, new Error('Transaction Not Found'));

      return _responseHandler2.default.send(res);
    }

    _responseHandler2.default.successful(200, 'Transaction fetch successful', {
      data: trans['0']
    });

    return _responseHandler2.default.send(res);
  }

}

exports.default = staffController;