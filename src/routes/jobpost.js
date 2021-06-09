const express = require('express')
const router = express.Router();
const jobpost = require('../controllers/jobpost')

router.post('/:id',jobpost.create)

module.exports = router