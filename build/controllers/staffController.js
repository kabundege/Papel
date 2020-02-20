"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _responseHandler = require("../helpers/responseHandler");

var _responseHandler2 = _interopRequireDefault(_responseHandler);

var _dbMethods = require("../helpers/dbMethods");

var _dbMethods2 = _interopRequireDefault(_dbMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class staffController {
  static async accounts(req, res) {
    let allAccounts;
    let user = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

    if (!user['0'].isadmin && user['0'].type !== "staff") {
      _responseHandler2.default.error(403, new Error('No Access'));

      return _responseHandler2.default.send(res);
    }

    allAccounts = await _dbMethods2.default.select('*', 'accounts');

    if (!allAccounts['0']) {
      _responseHandler2.default.error(404, new Error('No Accounts Found'));

      return _responseHandler2.default.send(res);
    }

    _responseHandler2.default.successful(200, 'the fecth was successful', {
      data: allAccounts
    });

    return _responseHandler2.default.send(res);
  }

  static async specificAccount(req, res) {
    let id = req.params.accountenumber;
    let user = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

    if (!user['0'].isadmin && user['0'].type !== "staff") {
      _responseHandler2.default.error(403, new Error('No Access'));

      return _responseHandler2.default.send(res);
    }

    if (isNaN(id)) {
      _responseHandler2.default.error(400, new Error('The Account Number Must Be A Number'));

      return _responseHandler2.default.send(res);
    }

    let Acc = await _dbMethods2.default.select('*', 'accounts', `accountnumber='${id}'`);

    if (!Acc['0']) {
      _responseHandler2.default.error(404, new Error('Account Not Found'));

      return _responseHandler2.default.send(res);
    }

    _responseHandler2.default.successful(200, 'Account fetch successful', {
      data: Acc['0']
    });

    return _responseHandler2.default.send(res);
  }

  static async createriaAccounts(req, res) {
    let value;
    req.url.includes('dormant') ? value = 'dormant' : value = 'active';
    let user = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

    if (!user['0'].isadmin && user['0'].type !== "staff") {
      _responseHandler2.default.error(403, new Error('You are not Allowed'));

      return _responseHandler2.default.send(res);
    }

    const allActive = await _dbMethods2.default.select('*', 'accounts', `status='${value}'`);

    if (!allActive['0']) {
      _responseHandler2.default.error(404, new Error('No Accounts Found'));

      return _responseHandler2.default.send(res);
    }

    _responseHandler2.default.successful(200, 'the fecth was successful', {
      data: allActive
    });

    return _responseHandler2.default.send(res);
  }

  static async activateDeactivate(req, res) {
    let id = req.params.accountenumber;
    const {
      status
    } = req.body;
    let accOwner = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

    if (!accOwner['0'].isadmin) {
      _responseHandler2.default.error(403, new Error('You are not Allowed'));

      return _responseHandler2.default.send(res);
    }

    if (isNaN(id)) {
      _responseHandler2.default.error(400, new Error('The Account Number Must Be A Number'));

      return _responseHandler2.default.send(res);
    }

    if (status !== 'active' && status !== 'dormant') {
      _responseHandler2.default.error(400, new Error('Invalid status'));

      return _responseHandler2.default.send(res);
    }

    let user = await _dbMethods2.default.select('*', 'Accounts', `accountnumber = '${id}'`);

    if (!user['0']) {
      _responseHandler2.default.error(404, new Error('Account Not Found'));

      return _responseHandler2.default.send(res);
    }

    let Acc = await _dbMethods2.default.update('accounts', `status='${status}'`, `accountnumber='${id}'`, '*');

    _responseHandler2.default.successful(200, 'Account fetch successful', Acc);

    return _responseHandler2.default.send(res);
  }

  static async Erase(req, res) {
    let id = req.params.accountenumber;
    let accOwner = await _dbMethods2.default.select('*', 'users', `userid='${req.user.userid}'`);

    if (!accOwner['0'].isadmin && accOwner['0'].type !== 'staff') {
      _responseHandler2.default.error(403, new Error('You are not Allowed'));

      return _responseHandler2.default.send(res);
    }

    if (isNaN(id)) {
      _responseHandler2.default.error(400, new Error('The Account Number Must Be A Number'));

      return _responseHandler2.default.send(res);
    }

    let user = await _dbMethods2.default.select('*', 'Accounts', `accountnumber = '${id}'`);

    if (!user['0']) {
      _responseHandler2.default.error(404, new Error('Account Not Found'));

      return _responseHandler2.default.send(res);
    }

    let Acc = await _dbMethods2.default.delete('accounts', `accountnumber='${id}'`);

    _responseHandler2.default.successful(200, 'Account successfully deleted');

    return _responseHandler2.default.send(res);
  }

}

exports.default = staffController;