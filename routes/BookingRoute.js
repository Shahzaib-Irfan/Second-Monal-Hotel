const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const room_array = require('../models/rooms');
router.post('/bookroom', async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalRent,
        totalDays
    } = req.body;
    
    try {
        const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalAmount : totalRent,
            totalDays,
            transactionId: '1234'
        });

        const booking = await newBooking.save();
        const roomTemp = await room_array.findOne({_id : room._id});
        roomTemp.currentBookings.push({bookingId : booking._id , fromdate : fromdate , todate : todate , userId : userid , status : booking.status});
        await roomTemp.save();
        res.status(200).json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message }); // Send the actual error message
    }
});



module.exports = router;