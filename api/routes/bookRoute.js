const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_51NdFjDHO3kvTfl2ztnE0sklP2TqStoumuLZsx3UdTs9HGtdQ0nWUQKkGAlW1EOFsqsyquXA2ct95P0pX6WhoEUM900W5ZjaFQZ')
const { v4: uuidv4 } = require('uuid')

const Booking = require('../models/booking')
const Rooms = require('../models/room')

router.post('/', async (req, res) => {
    const {
        room,
        userId,
        fromDate,
        toDate,
        totalRent,
        totalDays,
        token
    } = req.body

    // for payment
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create({
            amount : totalRent * 100,
            customer : customer.id,
            currency : 'USD',
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        })
        
        console.log(payment)
        if(payment){
            const newBooking = new Booking({
                room: room.name,
                roomId: room._id,
                userId,
                fromDate,
                toDate,
                totalDays,
                totalRent,
                transactionId: payment.id
            })
        
            const savedBooking = await newBooking.save();
        
            const roomTemp = await Rooms.findOne({ _id: room._id });
        
            roomTemp.currentBookings.push({
                bookingId: savedBooking._id,
                fromDate: savedBooking.fromDate,
                toDate: savedBooking.toDate,
                userId: savedBooking.userId,
                status: savedBooking.status
            });
        
            await roomTemp.save()
        
        
        }
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
    res.status(400).json({ message: error.message })
}

})

module.exports = router;
