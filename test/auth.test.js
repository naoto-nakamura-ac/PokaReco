const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const db = require('../server/db/index');

const app = require('../server.js');
const expect = chai.expect;

describe('authController', async () => {
  let request;

  before(() => {
    request = chai.request(app).keepOpen();
  });

  before(async () => {
    await db.migrate
      .forceFreeMigrationsLock()
      .then(() => db.migrate.rollback({ all: true }))
      .then(() => db.migrate.latest())
      .then(() => db.seed.run())
      .catch(console.error);
  });

  after(() => {
    request.close();
  });

  // const passwordHash = await bcrypt.hash('password12345', 10);

  const userDummyData = {
    email: 'fuga@fuga.com',
    name: 'mocha',
    password: 'password12345',
  };

  describe('registrater', () => {
    it('ユーザーの新規登録ができる', async () => {
      const expected = { message: 'User registered' };
      const res = await request.post('/api/auth/register').send(userDummyData);
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.deep.equal(expected);
    });

    it('ログインが成功する', async () => {
      const res = await request.post('/api/auth/login').send({
        email: userDummyData.email,
        password: userDummyData.password,
      });
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('token');
    });

    it('ログアウトが成功する', async () => {
      const res = await request.post('/api/auth/logout');
      expect(res.statusCode).to.equal(200);
    });
  });
});
