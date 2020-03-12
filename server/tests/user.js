import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('users can signup', () => {
  let token;
  let token2;
  let oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIxZjZkMGJlNS0xOTFiLTRhMTItOGMzOC01ODJhZjA0NjBmODgiLCJpYXQiOjE1ODE4MDI2MDJ9.8-IGTb-E62kIxdT-L7RGgZTI923MU7kHoNbwPjNwQcs';
  let wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyOiIxZjZkMGJlNS0xOTFiLTRhMTItOGMzOC01ODJhZjA0NjBmODgiLCJpYXQiOjE1ODE4MDI2MDJ9.8-IGTb-E62kIxdT-L7RGgZTI923MU7kHoNbwPjNwQcs';

  it('it should return validation error', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      type:'client',
      isadmin:'false'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return confirm password error', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'johnsdfg@gmail.com',
      password:'aPassword123!',
      confirmPassword:'inhgfdka'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return password strength', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password:'kwizera',
      confirmPassword:'kwizera'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return account created', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password:'aPassword123!',
      confirmPassword:'aPassword123!'
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

  it('it should return account already exits', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password:'aPassword123!',
      confirmPassword:'aPassword123!'
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
  });
  
  it('it should validation error', (done) => {
    const user = {
      email: 'john45gmail.com',
      password: 'aPassword123!',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should Login successfuly', (done) => {
    const user = {
      email: 'kabundege2@outlook.com',
      password: 'aPassword123!',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        token2 = res.body.data.token;
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('it should Login successfuly', (done) => {
    const user = {
      email: 'john45@gmail.com',
      password: 'aPassword123!',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        token = res.body.data.token;
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('it should return incorect password', (done) => {
    const user = {
      email: 'john45@gmail.com',
      password: 'kwizer4567a',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should User not found', (done) => {
    const user = {
      email: 'isajhhjc@gmail.com',
      password: 'kwizera',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });

  it('it should return password strength', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password:'kwizera',
      confirmPassword:'kwizera',
      type:'client',
      isadmin:false
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup/admin')
      .set('token',token2)
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return No access', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password:'aPassword123!',
      confirmPassword:'aPassword123!',
      type:'client',
      isadmin:false
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup/admin')
      .set('token',token)
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        done();
      });
  });

  it('it should return not matching', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'johnasdfg@gmail.com',
      password:'aPassword123!',
      confirmPassword:'aPasswo123!',
      type:'client',
      isadmin:false
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup/admin')
      .set('token',token2)
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return account created', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john@gmail.com',
      password:'aPassword123!',
      confirmPassword:'aPassword123!',
      type:'client',
      isadmin:false
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup/admin')
      .set('token',token2)
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('it should return validation', (done) => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
      email: 'john45gmail.com',
      password:'aPassword123!',
      confirmPassword:'aPassword123!',
      type:'client',
      isadmin:false
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup/admin')
      .set('token',token2)
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return account already exits', (done) => {
    const newUser = {
      firstName: 'John',
      lastName: 'Ishimwe',
      email: 'john45@gmail.com',
      password:'aPassword123!',
      confirmPassword:'aPassword123!',
      type:'client',
      isadmin:false
    };
    chai
      .request(app)
      .post('/api/v1/auth/signup/admin')
      .set('token',token2)
      .send(newUser)
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        done();
      });
  });

  it('it should validation error', (done) => {
    const user = {
      email: 'john45gmail.com',
      password: 'aPassword123!',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should email sent successfully', (done) => {
    const user = {
      email: 'kabundege2@outlook.com'
    };
    chai
      .request(app)
      .post('/api/v1/auth/email')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('it should Email not found', (done) => {
    const user = {
      email: 'christora@gmail.com'
    };
    chai
      .request(app)
      .post('/api/v1/auth/email')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
  });

  it('it should Email not found', (done) => {
    const user = {
      email: 'christoragmail.com'
    };
    chai
      .request(app)
      .post('/api/v1/auth/email')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should return old token', (done) => {
    const newAcc = {
      password:"kwizera"
    };
    chai
      .request(app)
      .patch('/api/v1/auth/reset')
      .send(newAcc)
      .set('token',oldToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return invalid token', (done) => {
    const newAcc = {
      password:"kwizera"
    };
    chai
      .request(app)
      .patch('/api/v1/auth/reset')
      .send(newAcc)
      .set('token',wrongToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        done();
      });
  });

  it('it should return confirm password required', (done) => {
    const newAcc = {
      password:"kwizera"
    };
    chai
      .request(app)
      .patch('/api/v1/auth/reset')
      .send(newAcc)
      .set('token',token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return invalid email', (done) => {
    const newAcc = {
      password:"kwizera",
      confirmPassword:"kwizera"
    };
    chai
      .request(app)
      .patch('/api/v1/auth/reset')
      .send(newAcc)
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return password strength', (done) => {
    const newAcc = {
      password:"kwizera",
      confirmPassword:"kwizera"
    };
    chai
      .request(app)
      .patch('/api/v1/auth/reset')
      .send(newAcc)
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return not matching', (done) => {
    const newAcc = {
      password:"aPassword123!",
      confirmPassword:"aPassword123"
    };
    chai
      .request(app)
      .patch('/api/v1/auth/reset')
      .send(newAcc)
      .set('token',token2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        done();
      });
  });

  it('it should return reset succesful', (done) => {
    const newAcc = {
      password:"aPassword123!",
      confirmPassword:"aPassword123!"
    };
    chai
      .request(app)
      .patch('/api/v1/auth/reset')
      .send(newAcc)
      .set('token',token)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  })

