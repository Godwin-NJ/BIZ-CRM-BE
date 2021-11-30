const express = require('express');
const router = express.Router()

const{crmData} = require('../controllers/dev')

router.route('/profile').get(crmData)

module.exports = router;

