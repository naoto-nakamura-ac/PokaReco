const express = require('express');
const router = express.Router();
const { authenticate } = require('./authMiddleware');
const { addChild } = require('../controllers/childrenController');

router.use(authenticate);
router.post('/', addChild);

module.exports = router;
