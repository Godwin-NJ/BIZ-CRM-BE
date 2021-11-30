const express = require('express');
const router = express.Router()

const {crmRegister,crmLogin,hugog_DevData} = require('../controllers/biz')

// router.route('/profile').get(crmData)

router.route('/register').post(crmRegister)

router.route('/login').post(crmLogin)

// router.route('/dev').post(hugog_DevData)




module.exports = router


