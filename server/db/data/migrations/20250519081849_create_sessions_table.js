exports.up = async (knex) => {
  await knex.schema.createTable('sessions', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.string('token').notNullable();
    table.timestamp('expires_at', { useTz: true }).notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('sessions');
};
