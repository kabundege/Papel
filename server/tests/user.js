import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('users can signup', () => {
  let token;
  let token2;
  it('it should return validation error', (done) => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
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
      firstname: 'John',
      lastname: 'Ishimwe',
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
      firstname: 'John',
      lastname: 'Ishimwe',
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
      firstname: 'John',
      lastname: 'Ishimwe',
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
      firstname: 'John',
      lastname: 'Ishimwe',
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
      email: 'kabundege@gmail.com',
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
        firstname: 'John',
        lastname: 'Ishimwe',
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
        firstname: 'John',
        lastname: 'Ishimwe',
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
        firstname: 'John',
        lastname: 'Ishimwe',
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
        firstname: 'John',
        lastname: 'Ishimwe',
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
        firstname: 'John',
        lastname: 'Ishimwe',
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

  })

