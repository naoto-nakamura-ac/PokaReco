const db = require('../db/index');

const USERS_TABLE = 'users';

module.exports = {
  USERS_TABLE,

  async createUser(email, password_hash, name) {
    return await db(USERS_TABLE)
      .insert({
        email,
        name,
        password_hash,
      })
      .returning(['email', 'name']);
  },

  async findUser(email) {
    return await db(USERS_TABLE).select().where('email', '=', email).first();
  },
};
