const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    name:{ 
        type: String,
        required : [true, 'user required'],
        unique:true,
        lowercase: true,
    },
    email : {
        type : String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email required"],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
             ,'Please provide Valid email address'
            ],
    },
    password:{
        type: String,
        required: [true, "password required"],
        trim: true,
        minLength:[6, 'Password should be morethan 6 characters']
    }

})                                      

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })


UserSchema.methods.comparePassword = async function(devPassword){
        const isMatch = await bcrypt.compare(devPassword, this.password)
        return isMatch
}

UserSchema.methods.createJwt = function(){
    return jwt.sign(
        {userId:this._id,name:this.name},
        process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
    })
}

module.exports = mongoose.model('User', UserSchema);



