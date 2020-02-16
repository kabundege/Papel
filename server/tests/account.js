import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';
import jwt from 'jsonwebtoken'

const { expect } = chai;
chai.use(chaiHttp);

describe('Accounts Test', () => {
  let token;
  let token2;
  let accountNumber;
  let oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxZjZkMGJlNS0xOTFiLTRhMTItOGMzOC01ODJhZjA0NjBmODgiLCJpYXQiOjE1ODE4MDI2MDJ9.8-IGTb-E62kIxdT-L7RGgZTI923MU7kHoNbwPjNwQcs';
  it('it should return account created', (done) => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
      email: 'kwizera@gmail.com',
      password:'kwizera',
      type:'staff',
      isadmin:true
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('it should return account created', (done) => {
    const newUser = {
      firstname: 'kabundege',
      lastname: 'kwizera',
      email: 'christophe@gmail.com',
      password:'kwizera'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

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

  it('it should no token ', (done) => {
    const newAcc = {
      openingbalance: 897657
    };
    chai
      .request(app)
      .post('/api/v1/account')
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });
  
  it('it should validation error', (done) => {
    const newAcc = {
      openingbalance: 897657,
      type: 'giveme'
    };
    chai
      .request(app)
      .post('/api/v1/account')
      .set('token',token)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should validation error', (done) => {
    const newAcc = {
      openingbalance: 897657
    };
    chai
      .request(app)
      .post('/api/v1/account')
      .set('token',token)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should ALL Accounts ', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts')
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it('it should No accounts found ', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts')
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
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
      accountNumber=res.body.data.accountnumber
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('it should Accounts token error', (done) => {
    const newAcc = {
      openingbalance: 897657,
      type: 'saving'
    };
    chai
      .request(app)
      .post('/api/v1/account')
      .set('token','sdfghjhsgfwdvwsqsqdecvfvfv')
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
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
      .set('tokehsn',token2)
      .send(newAcc)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return invalid Email ', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/isacgmailcom/accounts')
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return Email not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/isac@gmail.com/accounts')
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it('it should return Email not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/john@gmail.com/accounts')
      .set('tok',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return token error', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/john@gmail.com/accounts')
      .set('token','sdfghjhgf')
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return No Accounts Found on the Email', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/christophe@gmail.com/accounts')
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it('it should return no access', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/kwizera@gmail.com/accounts')
      .set('token',token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
  });

  it('it should return no access', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/kwizera@gmail.com/accounts')
      .set('token',oldToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should Email accounts', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/kwizera@gmail.com/accounts')
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('it should No Access', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts')
      .set('token',token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
  });

  it('it should ALL Accounts ', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts')
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
  
  it('it should return no access', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts/3456789')
      .set('token',token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
  });

  it('it should return params error', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts/345jhgd')
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return no Account found', (done) => {
    chai
      .request(app)
      .get('/api/v1/accounts/3454567')
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

  it('it should return a specific account', (done) => {
    chai
      .request(app)
      .get(`/api/v1/accounts/${accountNumber}`)
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

});
