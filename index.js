const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const authRouter = require('./server/routes/auth');

app.use(express.static(path.join(__dirname, '/public')));

app.use('/api', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
