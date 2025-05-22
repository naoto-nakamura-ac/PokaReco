const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const authRouter = require('./server/routes/authRoutes');
const usersRouter = require('./server/routes/usersRoutes');
const childrenRouter = require('./server/routes/childrenRoutes');
const recordsRouter = require('./server/routes/recordsRoutes');

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/api', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/children', childrenRouter);
app.use('/api/records', recordsRouter);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '/public', 'index.html'));
});

module.exports = app;
