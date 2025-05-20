const express = require('express');
const router = express.Router();
const { authenticate } = require('./authMiddleware');
const { myAccount } = require('../controllers/usersController');

router.use(authenticate);
router.get('/myAccount', myAccount);

module.exports = router;
