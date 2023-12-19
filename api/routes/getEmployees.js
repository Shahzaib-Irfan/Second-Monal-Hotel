const express = require('express')
const router = express.Router()

const Employees = require('../models/employee')

router.get('/', async(req,res) =>{
    
   try {
        const emp = await Employees.find({})
        //console.log(rooms)
        res.send(emp)
   } catch (error) {
    return res.status(400).json({message : error})
   }
})

// router.post('/:roomId', async (req, res) => {
//    console.log('Entering POST method');
//    const roomId = req.query.roomId;
 
//    try {
//      console.log('room id:', roomId);
//      const room = await Room.findOne({ _id: roomId });
//      console.log('room:', room);
//      res.send(room);
//    } catch (error) {
//      console.log('error:', error);
//      return res.status(400).json({ message: error });
//    }
//  });
 
 
 

module.exports = router