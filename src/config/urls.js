const express = require('express')
const router = express.Router()

router.use('/champions', require('../api-routes/champions'));

module.exports = router;