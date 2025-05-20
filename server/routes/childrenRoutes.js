const express = require('express');
const router = express.Router();
const { authenticate } = require('./authMiddleware');
const { add } = require('../controllers/childrenController');

router.use(authenticate);
router.post('/add', add);

module.exports = router;
