const mongoose = require('mongoose');
const { Schema } = mongoose;

const hugoDevSchema = new Schema({
    name:{
        type: String,
        required : [true, 'user required'],
        unique:true,
        lowercase: true,
    },
    skill :{
        type: String,
        required : [true, 'user required'],
        lowercase: true,
    }
})

module.exports = mongoose.model('Hugog_dev', hugoDevSchema);