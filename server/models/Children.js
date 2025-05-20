const db = require('../db/index');

const CHILDREN_TABLE = 'children';

module.exports = {
  CHILDREN_TABLE,
  async childrenFind(user_id) {
    return await db(CHILDREN_TABLE)
      .select(['id', 'user_id', 'name', 'birthday', 'gender'])
      .where('user_id', '=', user_id);
  },
};
