const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    cnic:{
        type:Number,
        required: true
    },
    phone:{
        type:String,
        required:true
    }
},{
    timestamps :true
})

const reviewModel = mongoose.model('employs', employeeSchema)

module.exports = reviewModel