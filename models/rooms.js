const mongoose = require("mongoose");

const room_schema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    maxCount:{
        type:Number,
        require:true
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    rentperday:{
        type:Number,
        require:true
    },
    imageUrls:[],
    currentBookings:[],
    type :{
        type:String,
        require:true
    },
    Room_description:{
        type:String,
        require:true
    }
} , {
    timestamps:true,
})


const roomModel = mongoose.model('rooms' , room_schema)

module.exports = roomModel;