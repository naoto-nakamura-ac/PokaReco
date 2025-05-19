const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER || 'postgres',
      database: process.env.POSTGRES_DB || 'pokareco',
      host: process.env.DATABASE_URL || 'localhost',
      port: process.env.PORT || 5432,
    },
    migrations: {
      directory: path.resolve(__dirname, './data/migrations'),
    },
    seeds: { directory: path.resolve(__dirname, './data/seeds') },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.resolve(__dirname, './data/migrations'),
    },
    seeds: { directory: path.resolve(__dirname, './data/seeds') },
  },
};
