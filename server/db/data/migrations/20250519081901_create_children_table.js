exports.up = async (knex) => {
  await knex.schema.createTable('children', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.date('birthday').notNullable();
    table.string('gender').notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('children');
};
