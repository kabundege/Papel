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
  it('admin login successful',(done) => {
      const loggedUser = {
        email: 'kwizera@gmail.com',
        password: 'aPassword123!'
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

    it('user login successful',(done) => {
      const loggedUser = {
        email: 'christophe@gmail.com',
        password: 'aPassword123!'
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
        type: 'saving'
      };
      chai
        .request(app)
        .post('/api/v1/user/account')
        .set('token',token2)
        .send(newAcc)
        .end((err, res) => {
          accountNumber=res.body.data.accountNumber
          expect(res.statusCode).to.equal(201);
          done();
        });
    });

    it('it should return No Access', (done) => {
        const newAcc = {
          amount:89
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

    it('it should return amount must be number', (done) => {
      const newAcc = {
        amount:'89'
      };
      chai
        .request(app)
        .post(`/api/v1/transaction/${accountNumber}/debit`)
        .set('token',token)
        .send(newAcc)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
      });
    });

    it('it should return params must be number', (done) => {
      const newAcc = {
        amount:89
      };
      chai
        .request(app)
        .post(`/api/v1/transaction/'${accountNumber}'/debit`)
        .set('token',token)
        .send(newAcc)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
      });
    });

    it('it should return amount must be number', (done) => {
      const newAcc = {
        amount:'89'
      };
      chai
        .request(app)
        .post(`/api/v1/transaction/${accountNumber}/credit`)
        .set('token',token)
        .send(newAcc)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
      });
    });

    it('it should return params must be number', (done) => {
      const newAcc = {
        amount:89
      };
      chai
        .request(app)
        .post(`/api/v1/transaction/'${accountNumber}'/credit`)
        .set('token',token)
        .send(newAcc)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
      });
    });

    it('it should return validation error', (done) => {
        const newAcc = {
          amount:'fghj'
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
          amount:89
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
          amount:3478987
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/${accountNumber}/debit`)
          .set('token',token2)
          .send(newAcc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(406);
            done();
        });
    });

    it('it should return No Access', (done) => {
        const newAcc = {
          amount:678
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/${accountNumber}/credit`)
          .set('token',token)
          .send(newAcc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(403);
            done();
        });
    });

    it('it should return validation error', (done) => {
        const newAcc = {
          amount:''
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/3456/credit`)
          .set('token',token2)
          .send(newAcc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            done();
        });
    });

    it('it should return params error', (done) => {
        const newAcc = {
          amount:0
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/345gfds6/credit`)
          .set('token',token2)
          .send(newAcc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            done();
        });
    });

    it('it should return account not found', (done) => {
        const newAcc = {
          amount:43
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/3456/credit`)
          .set('token',token2)
          .send(newAcc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            done();
        });
    });

    it('it should return Account cretdited', (done) => {
        const newAcc = {
          amount:600
        };
        chai
          .request(app)
          .post(`/api/v1/transaction/${accountNumber}/credit`)
          .set('token',token2)
          .send(newAcc)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            done();
        });
    });

    it('it should return Accounts created', (done) => {
      const newAcc = {
      amount:200
      };
      chai
        .request(app)
        .post(`/api/v1/transaction/${accountNumber}/debit`)
        .set('token',token2)
        .send(newAcc)
        .end((err, res) => {
          transactionId = res.body.data.transactionId
          expect(res.statusCode).to.equal(200);
          done();
      });
    });

    it('it should return params error', (done) => {
      chai
        .request(app)
        .get(`/api/v1/ghh787/transactions`)
        .set('token',token2)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          done();
      });
    });

    it('it should return not found', (done) => {
      chai
        .request(app)
        .get(`/api/v1/4567/transactions`)
        .set('token',token2)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          done();
      });
    });

  it('it should return fetch successful', (done) => {
      chai
      .request(app)
      .get(`/api/v1/${accountNumber}/transactions`)
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  }); 

  it('it should return fetch successful', (done) => {
    chai
      .request(app)
      .get(`/api/v1/transaction/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed`)
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
    });
  });

  it('it should return fetch successful', (done) => {
    chai
      .request(app)
      .get(`/api/v1/transaction/${transactionId}`)
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
    });
  });
 
});
