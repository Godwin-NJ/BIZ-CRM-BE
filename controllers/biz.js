const User = require('../models/User')
const {BadRequestError, UnauthenticatedError} = require('../errors')

const crmData = async(req,res) => {
    res.json('crm data')
}

const crmRegister = async(req,res) => {
        const user = await User.create(req.body);
        res.status(201).json({user})
        // console.log(user)
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
    
    res.status(200).json({user:{ name : user.name}, userId:user._id})   
    
}

const hugog_DevData = async(req,res) => {
    res.json('hugog dev registration ')
    console.log('hugog dev registration ')
}

module.exports = {
    crmRegister,
    crmLogin,
    crmData,
    hugog_DevData
}




