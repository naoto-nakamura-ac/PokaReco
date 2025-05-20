const db = require('../db/index');

const RECORDS_TABLE = 'records';

module.exports = {
  RECORDS_TABLE,
  async findRecordsAll(child_id) {
    return await db(RECORDS_TABLE)
      .select([
        'id',
        'child_id',
        'record_date',
        'timeframe',
        'temperature',
        'height',
        'weight',
        'memo',
      ])
      .where('child_id', '=', child_id);
  },

  async findRecordsRange(child_id, start, end) {
    return await db(RECORDS_TABLE)
      .select([
        'id',
        'child_id',
        'record_date',
        'timeframe',
        'temperature',
        'height',
        'weight',
        'memo',
      ])
      .where('child_id', '=', child_id)
      .whereBetween('record_date', [start, end]);
  },

  async insRecord(insertData) {
    await db(RECORDS_TABLE).insert(insertData);
  },
};
