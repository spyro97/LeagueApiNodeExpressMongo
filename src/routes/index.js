const express = require('express')
const router = express.Router()

router.use('/champions', require('../controllers/champions'));
router.use('/user', require('../controllers/login'));

module.exports = router;