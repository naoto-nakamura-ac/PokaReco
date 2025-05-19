/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('records').del();
  await knex('children').del();
  await knex('users').del();

  const passwordHash = await bcrypt.hash('password', 10);
  await knex('users').insert([
    {
      email: 'hoge@hoge.com',
      name: 'testUser',
      password_hash: passwordHash,
    },
  ]);

  await knex('children').insert([
    {
      user_id: 1,
      name: 'ポカレコ',
      birthday: '2023-12-3',
      gender: 'm',
    },
  ]);

  await knex('records').insert([
    {
      child_id: 1,
      record_date: '2025-05-19',
      timeframe: 'morning',
      temperature: 36.8,
      weight: 12.5,
      height: 85.2,
      memo: '元気',
    },
    {
      child_id: 1,
      record_date: '2025-05-19',
      timeframe: 'night',
      temperature: 37.5,
      weight: null,
      height: null,
      memo: '若干熱っぽい',
    },
  ]);
};
