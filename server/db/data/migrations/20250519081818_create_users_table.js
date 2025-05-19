exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('name').notNullable();
    table.string('password_hash').notNullable();
    table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('users');
};
