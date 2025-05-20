const express = require('express');
const router = express.Router();
const { authenticate } = require('./authMiddleware');
const { addChild, deleteChild } = require('../controllers/childrenController');

router.use(authenticate);
router.post('/', addChild);
router.delete('/', deleteChild);

module.exports = router;
