const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const db = require('../server/db/index');

const app = require('../server.js');
const expect = chai.expect;

describe('RecordsController', () => {
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
    await request.post('/api/auth/registrater').send(userDummyData);
  });

  after(() => {
    request.close();
  });

  describe('addRecord', () => {
    it('記録が追加できる', async () => {
      const childData = {
        user_id: 2,
        name: 'testBaby',
        birthday: '2024-01-01',
        gender: 'f',
      };
      const resLogin = await request.post('/api/auth/login').send({
        email: userDummyData.email,
        password: userDummyData.password,
      });
      await request
        .post('/api/children/')
        .set('Cookie', `session_token=${resLogin.body.token}`)
        .send(childData);

      const expected = {
        message: 'レコードの追加に成功しました',
      };

      const testData = {
        record_date: '2025-05-20',
        timeframe: 'night',
        temperature: 36.7,
        height: 90.2,
        weight: 10.2,
        memo: 'めっちゃ元気',
      };
      const res = await request
        .post('/api/records/')
        .set('Cookie', `session_token=${resLogin.body.token}`)
        .send(testData);
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.deep.equal(expected);
    });

    it('nullが含まれた記録も追加できる', async () => {
      const resLogin = await request.post('/api/auth/login').send({
        email: userDummyData.email,
        password: userDummyData.password,
      });

      const expected = {
        message: 'レコードの追加に成功しました',
      };

      const testData = {
        record_date: '2025-05-21',
        timeframe: 'night',
        temperature: 38.7,
        height: null,
        weight: null,
        memo: '高熱',
      };
      const res = await request
        .post('/api/records/')
        .set('Cookie', `session_token=${resLogin.body.token}`)
        .send(testData);
      expect(res.statusCode).to.equal(201);
      expect(res.body).to.deep.equal(expected);
    });

    it('すべての記録が取得できる', async () => {
      const expected = [
        {
          id: 1,
          child_id: 1,
          record_date: '2025-05-18T15:00:00.000Z',
          timeframe: 'morning',
          temperature: 36.8,
          height: 85.2,
          weight: 12.5,
          memo: '元気',
        },
        {
          id: 2,
          child_id: 1,
          record_date: '2025-05-18T15:00:00.000Z',
          timeframe: 'night',
          temperature: 37.5,
          height: null,
          weight: null,
          memo: '若干熱っぽい',
        },
      ];
      const userDummyData = {
        email: 'hoge@hoge.com',
        password: 'password',
        // "name": "test"
      };
      const resLogin = await request.post('/api/auth/login').send({
        email: userDummyData.email,
        password: userDummyData.password,
      });
      const res = await request
        .get('/api/records/')
        .set('Cookie', `session_token=${resLogin.body.token}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.deep.equal(expected);
      console.log('🍣 ~ records.test.js:136 ~ it ~ res.body:', res.body);
    });

    it('指定した期間のレコードが取得できる', async () => {
      const expected = [
        {
          id: 1,
          child_id: 1,
          record_date: '2025-05-18T15:00:00.000Z',
          timeframe: 'morning',
          temperature: 36.8,
          height: 85.2,
          weight: 12.5,
          memo: '元気',
        },
        {
          id: 2,
          child_id: 1,
          record_date: '2025-05-18T15:00:00.000Z',
          timeframe: 'night',
          temperature: 37.5,
          height: null,
          weight: null,
          memo: '若干熱っぽい',
        },
      ];
      const userDummyData = {
        email: 'hoge@hoge.com',
        password: 'password',
        // "name": "test"
      };
      const resLogin = await request.post('/api/auth/login').send({
        email: userDummyData.email,
        password: userDummyData.password,
      });
      const testData = {
        record_date: '2024-05-21',
        timeframe: 'afternoon',
        temperature: 36.5,
        height: 76.5,
        weight: 7.4,
        memo: '寝返りできた',
      };
      await request
        .post('/api/records/')
        .set('Cookie', `session_token=${resLogin.body.token}`)
        .send(testData);

      const insGetRes = await request
        .get('/api/records/')
        .set('Cookie', `session_token=${resLogin.body.token}`);
      console.log(
        '🍣 ~ records.test.js:185 ~ it ~ insGetRes.body:',
        insGetRes.body
      );

      const res = await request
        .get('/api/records/?start=2025-05-01&end=2025-05-31')
        .set('Cookie', `session_token=${resLogin.body.token}`);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.deep.equal(expected);
      console.log('🍣 ~ records.test.js:188 ~ it ~ res.body:', res.body);
    });
  });
});
