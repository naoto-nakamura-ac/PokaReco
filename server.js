const path = require('path');
const express = require('express');
const app = express();

const authRouter = require('./server/routes/auth');
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/api', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRouter);

module.exports = app;
