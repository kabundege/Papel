import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';
import jwt from 'jsonwebtoken'

const { expect } = chai;
chai.use(chaiHttp);

describe('users can signup', () => {
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
  it('it should return account created', (done) => {
    const newUser = {
      firstname: 'John',
      lastname: 'Ishimwe',
      email: 'john45@gmail.com',
      password:'kwizera',
      type:'client',
      isadmin:false
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
      password:'kwizera',
      type:'client',
      isadmin:false
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
      password: 'kwizera',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
  it('it should Login successfuly', (done) => {
    const user = {
      email: 'john45@gmail.com',
      password: 'kwizera',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal(200);
        done();
      });
  });
  it('it should User not found', (done) => {
    const user = {
      email: 'kabundege@gmail.com',
      password: 'kwizera',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        done();
      });
  });
  it('it should Login successfuly', (done) => {
    const user = {
      email: 'john45@gmail.com',
      password: 'kwizerasdfg',
    };
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.status).to.equal(400);
        done();
      });
  });
});