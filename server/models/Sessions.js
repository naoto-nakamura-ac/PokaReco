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

  async findToken(token) {
    return await db(SESSIONS_TABLE)
      .select()
      .innerJoin('users', function () {
        this.on(`${SESSIONS_TABLE}.user_id`, '=', 'users.id');
      })
      .where('token', '=', token)
      .first();
  },
};
