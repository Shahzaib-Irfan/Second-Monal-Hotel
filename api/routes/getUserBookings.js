const express = require('express')
const router = express.Router()

const Bookings = require('../models/booking')

router.post('/', async (req, res) => {
   const userId = req.body.userId

   try {
    const data = await Bookings.find({userId : userId})
    
    res.send(data)
   } catch (error) {
    res.sendStatus(400)
   } 
})

module.exports = router;