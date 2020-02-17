import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('Transaction Test', () => {
  let token;
  let token2;
  let transactionId;
  let accountNumber;
  it('login successful',(done) => {
      const loggedUser = {
        email: 'kwizera@gmail.com',
        password: 'kwizera'
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(loggedUser)
        .end((err, res) => {
          token2 = res.body.data.token;
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('login successful',(done) => {
      const loggedUser = {
        email: 'christophe@gmail.com',
        password: 'kwizera'
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(loggedUser)
        .end((err, res) => {
          token = res.body.data.token;
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('it should Accounts created', (done) => {
        const newAcc = {
          openingbalance: 897657,
          type: 'saving'
        };
        chai
          .request(app)
          .post('/api/v1/account')
          .set('token',token2)
          .send(newAcc)
          .end((err, res) => {
          accountNumber = res.body.data.accountnumber
            expect(res.statusCode).to.equal(201);
            done();
        });
    });

    it('it should return No Access', (done) => {
        const newAcc = {
          cashier:3456,
          amount:0
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/${accountNumber}/debit`)
          .set('token',token)
          .send(newAcc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            done();
        });
    });

    it('it should return validation error', (done) => {
        const newAcc = {
          cashier:3456
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/3456/debit`)
          .set('token',token2)
          .send(newAcc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            done();
        });
    });

    it('it should return params error', (done) => {
        const newAcc = {
          cashier:3456,
          amount:0
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/345gfds6/debit`)
          .set('token',token2)
          .send(newAcc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            done();
        });
    });

    it('it should return account not found', (done) => {
        const newAcc = {
          cashier:3456,
          amount:0
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/3456/debit`)
          .set('token',token2)
          .send(newAcc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            done();
        });
    });

    it('it should return insufficient Amount', (done) => {
        const newAcc = {
          cashier:3456,
          amount:34567
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/${accountNumber}/debit`)
          .set('token',token2)
          .send(newAcc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(409);
            done();
        });
    });

    it('it should return Accounts created', (done) => {
        const newAcc = {
          cashier:3456,
          amount:0
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/${accountNumber}/debit`)
          .set('token',token2)
          .send(newAcc)
          .end((err, res) => {
            transactionId = res.body.data.transactionid
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

});