const express = require('express')
const router = express.Router()

const url = require('./url')

router.use('/', url)

module.exports = router
