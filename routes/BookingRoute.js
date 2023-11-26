const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const room_array = require('../models/rooms');
const stripe = require('stripe')('sk_test_51NQplaIguDrrT8uj975KQ7XbE1Uh8887Tl8TdhhrpHrCYMt0TgGwcohRVreIo7PQCZt35AIdy2US6nBQ7LYmcw0Z007bHu5rIa'); // Replace with your actual Stripe secret key
const { v4: uuidv4 } = require('uuid');


router.post('/bookroom', async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalRent,
        totalDays,
        token
    } = req.body;

    try {
        // Create a customer in Stripe
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id // Use the correct property for the payment source
        });

        // const payment = await stripe.charges.create(
        //     {
        //         amount: totalRent * 100,
        //         currency: 'PKR',
        //         customer: customer.id,
        //         receipt_email: token.email,
        //     },
        //     {
        //         idempotency_key: uuidv4(),
        //     }
        // );
        

        // If payment is successful, save the booking data
        if (customer.id !== null && customer.id !== undefined) {
            // Create a new booking
            const newBooking = new Booking({
                room: room.name,
                roomid: room._id,
                userid,
                fromdate,
                todate,
                totalAmount: totalRent,
                totalDays,
                transactionId: '1234'
            });

            const booking = await newBooking.save();

            // Update room information
            const roomTemp = await room_array.findOne({ _id: room._id });
            roomTemp.currentBookings.push({
                bookingId: booking._id,
                fromdate,
                todate,
                userId: userid,
                status: booking.status
            });
            await roomTemp.save();

            res.status(200).json({ message: 'Booking and payment successful', booking, payment });
        } else {
            // Handle unsuccessful payment
            res.status(400).json({ message: 'Payment unsuccessful', payment });
        }
    } catch (error) {
        console.error('Error:', error);

        if (error.type === 'StripeCardError') {
            // The card was declined
            return res.status(400).json({ message: 'Payment declined', error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

router.post('/getbookingsbyuserid', async (req, res) => {
    try {
      const { userid } = req.body;
      // Assuming you are using Mongoose for MongoDB operations
      const booking = await Booking.find({ userid });
      
      if (booking) {
        res.json(booking);
      } else {
        res.json({ success: false, message: 'Bookings not found for the given userid' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

router.post('/cancelbooking' , async(req,res) =>{
    const {id , roomid} = req.body;
    try {
        const booking = await Booking.findOne({_id : id});
        booking.status = 'cancelled';
        await booking.save();
        const room = await room_array.findOne({_id : roomid});
        const bookins = room.currentBookings;
        const tempObj = bookins.filter(bookin => bookin.bookingId.toString()!==id);
        room.currentBookings = tempObj;
        await room.save();
        res.send("Your booking cancelled successfully");
    } catch (error) {
        return res.status(400).json({error});
    }
});

router.get('/getallbookings' , async(req,res)=>{
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;
