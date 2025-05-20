const db = require('../db/index');

const SESSIONS_TABLE = 'sessions';

module.exports = {
  SESSIONS_TABLE,

  async insSession(insertData) {
    await db(SESSIONS_TABLE).insert(insertData);
  },

  async delSession(token) {
    await db(SESSIONS_TABLE).where('token', '=', token).del();
  },
};
