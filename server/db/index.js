const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const nodeEnv = process.env.NODE_ENV;
const knexConfig = require('./knexfile')[nodeEnv];
const knex = require('knex');

module.exports = knex(knexConfig);
