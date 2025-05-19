exports.up = async (knex) => {
  await knex.schema.createTable('records', (table) => {
    table.increments('id').primary();
    table.integer('child_id').notNullable();
    table.foreign('child_id').references('children.id').onDelete('CASCADE');
    table.date('record_date').notNullable();
    table.enu('timeframe', ['morning', 'afternoon', 'night']).notNullable();
    table.float('temperature');
    table.float('height');
    table.float('weight');
    table.text('memo');
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
    table.unique(['child_id', 'record_date', 'timeframe']);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('records');
};
