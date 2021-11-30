const User = require('../models/User')
const {StatusCodes}= require('http-status-codes') ;
const {BadRequestError, UnauthenticatedError} = require('../errors')

// const crmData = async(req,res) => {
//     res.json('crm data')
// }

const crmRegister = async(req,res) => {
        const{name,email,password} = req.body
        if(!name || !email || !password){
            throw new BadRequestError("Please provide infromation")
        }
        const user = await User.create({...req.body});
        const token = user.createJwt()
        res.status(StatusCodes.CREATED).json({user:{name:user.name}, token})
}

const crmLogin = async(req,res) => {
    const{email,password} = req.body

    if (!email || !password) { 
        throw new BadRequestError('Please provide email and password')
      }

    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    
    const token = user.createJwt()

    res.status(StatusCodes.OK).json({user:{ name : user.name}, token})   
    
}

// const hugog_DevData = async(req,res) => {
//     res.json('hugog dev registration ')
//     console.log('hugog dev registration ')
// }

module.exports = {
    crmRegister,
    crmLogin
    // crmData,
    // hugog_DevData
}




