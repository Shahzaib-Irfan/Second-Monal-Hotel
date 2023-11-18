const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');

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
            totalRent,
            totalDays,
            transactionId: '1234'
        });

        const booking = await newBooking.save();

        res.status(200).json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message }); // Send the actual error message
    }
});



module.exports = router;