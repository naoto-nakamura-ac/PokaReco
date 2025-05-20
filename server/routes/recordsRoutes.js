const express = require('express');
const router = express.Router();
const { authenticate } = require('./authMiddleware');
const { addRecord, getRecords } = require('../controllers/recordsController');

router.use(authenticate);
router.post('/', addRecord);
router.get('/', getRecords);

module.exports = router;
