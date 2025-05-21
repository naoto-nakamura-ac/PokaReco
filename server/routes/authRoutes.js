const express = require('express');
const router = express.Router();
const {
  login,
  logout,
  register,
  authMe,
} = require('../controllers/authController');
const { authenticate } = require('./authMiddleware');

router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.get('/me', authenticate, authMe);

module.exports = router;
