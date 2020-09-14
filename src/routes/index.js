const express = require('express')
const router = express.Router()

router.use('/champions', require('../controllers/champions'));

module.exports = router;