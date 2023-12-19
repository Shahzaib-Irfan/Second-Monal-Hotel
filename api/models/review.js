const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    bookingId:{
        type:String,
        required: true
    },
    review:{
        type:Number,
        required: true
    }
},{
    timestamps :true
})

const reviewModel = mongoose.model('review', reviewSchema)

module.exports = reviewModel