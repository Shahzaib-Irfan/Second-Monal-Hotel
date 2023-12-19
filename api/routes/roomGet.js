const express = require('express')
const router = express.Router()

const Room = require('../models/room')
router.get('/', async (req, res) => {
    const roomId = req.query.id; 

  
    try {
      console.log('room id:', roomId);
      const room = await Room.findOne({ _id: roomId });
      console.log('room:', room);
      res.send(room);
    } catch (error) {
      console.log('error:', error);
      return res.status(400).json({ message: error });
    }
  });

module.exports = router;