const express = require('express')
const router = express.Router()

const Bookings = require('../models/booking')

router.get('/', async (req, res) => {
  

   try {
    const data = await Bookings.find({})
    
    res.send(data)
   } catch (error) {
    res.sendStatus(400)
   } 
})

module.exports = router;