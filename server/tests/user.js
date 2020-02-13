import chai from 'chai';
import chaiHttp from 'chai-http';
import 'chai/register-should';
import app from '../app';

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
        // console.log(res.body)
        expect(res.statusCode).to.equal(409);
        done();
      });
  });
});
