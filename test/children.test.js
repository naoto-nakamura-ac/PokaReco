const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const db = require('../server/db/index');

const app = require('../server.js');
const expect = chai.expect;

describe('childrenController', () => {
  let request;
  const userDummyData = {
    email: 'fuga@fuga.com',
    name: 'mocha',
    password: 'password12345',
  };
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
    await request.post('/api/auth/register').send(userDummyData);
  });

  after(() => {
    request.close();
  });

  describe('addChild', () => {
    it('子供が追加できる', async () => {
      const childData = {
        user_id: 2,
        name: 'testBaby',
        birthday: '2024-01-01',
        gender: 'f',
      };
      const expected = {
        message: '子供の追加に成功しました',
        newChildName: 'testBaby',
      };
      const resLogin = await request.post('/api/auth/login').send({
        email: userDummyData.email,
        password: userDummyData.password,
      });
      const res = await request
        .post('/api/children/')
        .set('Cookie', `session_token=${resLogin.body.token}`)
        .send(childData);
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.deep.equal(expected);
    });

    it('すでに登録されている場合はエラー(現状は)', async () => {
      const childData = {
        user_id: 1,
        name: 'testBaby',
        birthday: '2024-01-01',
        gender: 'f',
      };
      const expected = { message: '今は一人しか追加できません！今はね。。。' };
      const resLogin = await request.post('/api/auth/login').send({
        email: userDummyData.email,
        password: userDummyData.password,
      });
      const res = await request
        .post('/api/children/')
        .set('Cookie', `session_token=${resLogin.body.token}`)
        .send(childData);
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.deep.equal(expected);
    });
  });

  describe('deleteChild', () => {
    it('子供を削除できる', async () => {
      await request
        .post('/api/auth/register')
        .send({ email: 'test', name: 'test', password: 'test' });

      const resLogin = await request.post('/api/auth/login').send({
        email: 'test',
        password: 'test',
      });

      const childData = {
        name: 'test',
        birthday: '2024-01-01',
        gender: 'f',
      };
      await request
        .post('/api/children/')
        .set('Cookie', `session_token=${resLogin.body.token}`)
        .send(childData);

      const expected = { message: '子供を削除しました' };
      const res = await request
        .delete('/api/children/')
        .set('Cookie', `session_token=${resLogin.body.token}`);
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.deep.equal(expected);
    });
  });
});
