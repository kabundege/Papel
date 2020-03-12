import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import dotenv from 'dotenv';
import passport from 'passport';
import authController from '../controllers/userController';

const {
  expect
} = chai;

dotenv.config();

chai.use(chaiHttp);

describe('GOOGLE oAuthentication tests', () => {
  before(() => {
    sinon.stub(passport, 'authenticate').callsFake((strategy, scope, callback) => callback(null, { firstName: 'Jim', email: 'jim.ntare@gmail.com' }));
  });

  it('should save signup gmail user and save in db', async () => {
    const req = {
      user: {
        id: '112126980710850867897',
        displayName: 'Jim Ntare',
        name: { familyName: 'Ntare', givenName: 'Jim' },
        emails: [{ value: 'jim.ntare@gmail.com', verified: true }],
        provider: 'google',
      }
    };
    const res = { status: () => ({ json: (data) => ({ body: { ...data } }) }) };
    const results = await authController.auth(req, res);
    expect(results.body.status).to.equal(200);
  });

  it('should login the user', async () => {
    const req = {
      user: {
        id: '112126980710850867897',
        displayName: 'Jim Ntare',
        name: { familyName: 'Ntare', givenName: 'Jim' },
        emails: [{ value: 'jim.ntare@gmail.com', verified: true }],
        provider: 'google',
      }
    };
    const res = { status: () => ({ json: (data) => ({ body: { ...data } }) }) };
    const results = await authController.auth(req, res);
    expect(results.body.status).to.equal(200);
  });
});

describe('FACEBOOK oAuthentication tests', () => {
  it('should save signup fb user and save in db', async () => {
    const req = {
      user: {
        id: '11212698071085sd67897',
        displayName: 'Jim Ntare',
        name: { familyName: 'Ntare', givenName: 'Jim' },
        emails: [{ value: 'jim.ntare@hotmail.com', verified: true }],
        provider: 'facebook',
      }
    };
    const res = { status: () => ({ json: (data) => ({ body: { ...data } }) }) };
    const results = await authController.auth(req, res);
    expect(results.body.status).to.equal(200);
  });

  it('should login the user', async () => {
    const req = {
      user: {
        id: '11212698071085sd67897',
        displayName: 'Jim Ntare',
        name: { familyName: 'Ntare', givenName: 'Jim' },
        emails: [{ value: 'jim.ntare@hotmail.com', verified: true }],
        provider: 'facebook',
      }
    };
    const res = { status: () => ({ json: (data) => ({ body: { ...data } }) }) };
    const results = await authController.auth(req, res);
    expect(results.body.status).to.equal(200);
  });
})