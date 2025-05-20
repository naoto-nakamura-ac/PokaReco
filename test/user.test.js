const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const db = require('../server/db/index');
const Session = require('../server/models/Sessions');

const app = require('../server.js');
const expect = chai.expect;

describe('userController', () => {
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

  describe('authMiddleware', () => {
    it('セッショントークンがcookieに設定されていない場合は未認証として弾く', async () => {
      const expected = { message: 'ログインしていません' };
      await request.post('/api/auth/login').send({
        email: userDummyData.email,
        password: userDummyData.password,
      });
      const res = await request.get('/api/users/myAccount');
      expect(res.statusCode).to.equal(401);
      expect(res.body).to.deep.equal(expected);
    });

    it('セッショントークンが期限切れの場合は弾く', async () => {
      const expected = { message: '無効なセッション' };
      await request.post('/api/auth/login').send({
        email: userDummyData.email,
        password: userDummyData.password,
      });
      const dummyData = {
        token: 'hoge',
        user_id: 2,
        expires_at: new Date(Date.now() - 1000 * 60 * 120),
      };
      await Session.insSession(dummyData);
      const res = await request
        .get('/api/users/myAccount')
        .set('Cookie', `session_token=${dummyData.token}`);
      expect(res.statusCode).to.equal(401);
      expect(res.body).to.deep.equal(expected);
    });
  });

  describe('myAccount', () => {
    it('ユーザーが自分の情報を取得できる', async () => {
      const expected = {
        email: 'fuga@fuga.com',
        name: 'mocha',
        children: [],
      };
      const resLogin = await request.post('/api/auth/login').send({
        email: userDummyData.email,
        password: userDummyData.password,
      });
      const res = await request
        .get('/api/users/myAccount')
        .set('Cookie', `session_token=${resLogin.body.token}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.deep.equal(expected);
    });

    it('登録している子ども情報を取得できる', async () => {
      const userDummyData = {
        email: 'hoge@hoge.com',
        name: 'testUser',
        password: 'password',
      };
      const expected = {
        children: [
          {
            birthday: '2023-12-02T15:00:00.000Z',
            gender: 'm',
            id: 1,
            name: 'ポカレコ',
            user_id: 1,
          },
        ],
        email: 'hoge@hoge.com',
        name: 'testUser',
      };
      const resLogin = await request.post('/api/auth/login').send({
        email: userDummyData.email,
        password: userDummyData.password,
      });
      const res = await request
        .get('/api/users/myAccount')
        .set('Cookie', `session_token=${resLogin.body.token}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.deep.equal(expected);
    });
  });
});
