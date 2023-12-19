const express = require('express')
const router = express.Router()

const Bookings = require('../models/booking')
const Rooms = require('../models/room')

router.post('/', async (req, res) => {
   const {
    bookingId,
    roomId
   } = req.body

   try {
    const bookings = await Bookings.findOne({_id : bookingId})

    bookings.status = 'cancelled'
    await bookings.save()

    const room = await Rooms.findOne({ _id : roomId})

    const cBookings = room.currentBookings

    const temp = cBookings.filter(b => b.bookingId.toString() !== bookingId)
    room.currentBookings = temp

    await room.save()
    
    res.sendStatus(200)
   } catch (error) {
    res.sendStatus(400)
   } 
})

module.exports = router;