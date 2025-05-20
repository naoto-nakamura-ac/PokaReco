const express = require('express');
const router = express.Router();
const { login, logout, registrater } = require('../controllers/authController');

router.post('/login', login);
router.post('/logout', logout);
router.post('/registrater', registrater);

module.exports = router;
