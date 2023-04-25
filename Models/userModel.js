
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        match: /^\S+@\S+\.\S+$/,
        required:[true, 'user must have a email'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'user must have a password'],
        minLength:8
    },
    firstName:{
        type: String,
        required:[true, 'user must have firstName'],
        match: /^[A-Za-z]+(?:\s[A-Za-z]+)*$/
    },
    lastName:{
        type: String,
        required:[true, 'user must have lastName'],
        match:/^[A-Za-z]+(?:\s[A-Za-z]+)*$/
    },
    dateOfBirth:{
        type:Date,
        required:[true, 'user must have DOB'],
    },
    gender:{
        type: String,
        enum: ['male', 'female', 'other'],
        required:[true, 'user must select gender']
    },
    phone: {
        type: String,
        match:/^[+][0-9]{1,3}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/
      },
    isAdmin:{
        type:Boolean,
        default:false
    }
})


const User = mongoose.model('User',userSchema)

module.exports = User
