const db = require('../db/index');

const CHILDREN_TABLE = 'children';

module.exports = {
  CHILDREN_TABLE,
  async findChildren(user_id) {
    return await db(CHILDREN_TABLE)
      .select(['id', 'user_id', 'name', 'birthday', 'gender'])
      .where('user_id', '=', user_id);
  },

  async insChild(insertData) {
    return await db(CHILDREN_TABLE).insert(insertData).returning(['name']);
  },

  async delChild(child_id) {
    await db(CHILDREN_TABLE).where('id', '=', child_id).del();
  },
};
