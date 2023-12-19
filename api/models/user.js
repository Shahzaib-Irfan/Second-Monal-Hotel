const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },role:{
        type:Number,
        required: true
    }
})

const roomModel = mongoose.model('users', userSchema)

module.exports = roomModel