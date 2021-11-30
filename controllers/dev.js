const User = require('../models/User')
const {StatusCodes}= require('http-status-codes') ;
const {BadRequestError, UnauthenticatedError} = require('../errors')

const crmData = async(req,res) => {
    res.json('crm data')
}



module.exports ={
    crmData
}