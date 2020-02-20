"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _v = require("uuid/v4");

var _v2 = _interopRequireDefault(_v);

var _responseHandler = require("../helpers/responseHandler");

var _responseHandler2 = _interopRequireDefault(_responseHandler);

var _dbMethods = require("../helpers/dbMethods");

var _dbMethods2 = _interopRequireDefault(_dbMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class staffController {
  static async debit(req, res) {
    const {
      cashier,
      amount
    } = req.body;
    const id = req.params.accountnumber;
    const uuid = (0, _v2.default)();
    let user = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

    if (isNaN(id)) {
      _responseHandler2.default.error(400, new Error('The Account Number Must Be A Number'));

      return _responseHandler2.default.send(res);
    }

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
      _responseHandler2.default.error(409, new Error('insufficient Amount'));

      return _responseHandler2.default.send(res);
    }

    let newAmount = userAcc['0'].balance - amount;
    const trans = await _dbMethods2.default.insert('transactions', 'transid,type,accountnumber,cashier,amount,oldbalance,newbalance', "$1,$2,$3,$4,$5,$6,$7", [uuid, 'debit', id, cashier, amount, userAcc['0'].balance, newAmount], '*');
    const Acc = await _dbMethods2.default.update('accounts', `balance='${newAmount}',status='active'`, `accountnumber='${id}'`, '*');

    _responseHandler2.default.successful(200, 'Account fetch successful', {
      transactionid: trans.transid,
      accountnumber: id,
      cashier: cashier,
      transactionType: 'debit',
      accountbalance: newAmount
    });

    return _responseHandler2.default.send(res);
  }

  static async credit(req, res) {
    const {
      cashier,
      amount
    } = req.body;
    const id = req.params.accountnumber;
    const uuid = (0, _v2.default)();
    let user = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

    if (isNaN(id)) {
      _responseHandler2.default.error(400, new Error('The Account Number Must Be A Number'));

      return _responseHandler2.default.send(res);
    }

    if (user['0'].type !== "staff") {
      _responseHandler2.default.error(403, new Error('No Access'));

      return _responseHandler2.default.send(res);
    }

    const userAcc = await _dbMethods2.default.select('*', 'accounts', `accountnumber='${id}'`);

    if (!userAcc['0']) {
      _responseHandler2.default.error(404, new Error('Account Not Found'));

      return _responseHandler2.default.send(res);
    }

    const trans = await _dbMethods2.default.insert('transactions', 'transid,type,accountnumber,cashier,amount,oldbalance,newbalance', "$1,$2,$3,$4,$5,$6,$7", [uuid, 'credit', id, cashier, amount, userAcc['0'].balance, amount], '*');
    const Acc = await _dbMethods2.default.update('accounts', `balance='${amount}',status='active'`, `accountnumber='${id}'`, '*');

    _responseHandler2.default.successful(200, 'Account fetch successful', {
      transactionid: trans.transid,
      accountnumber: id,
      cashier: cashier,
      transactionType: 'credit',
      accountbalance: amount
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