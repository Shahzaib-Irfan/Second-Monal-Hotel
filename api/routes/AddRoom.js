const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const Room = require('../models/room');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images');
    },
    filename: function (req, file, cb) {
      const uniqueFilename = Date.now() + file.originalname;
      cb(null, uniqueFilename);
    },
  });
  
const upload = multer({ storage });

router.post('/', upload.array('images', 3), async (req, res) => {
  try {
    const { name, maxCount, phoneNumber, rentPerDay, type, description } = req.body;
    const imageUrls = req.files.map((file) => file.filename);

    const newRoom = new Room({
      name,
      maxCount,
      phoneNumber,
      rentPerDay,
      type,
      description,
      imageurls: imageUrls,
      currentBookings:[]
    });

    const savedRoom = await newRoom.save();
    res.sendStatus(200);
  } catch (error) {
    console.error('Error creating room:', error);
    res.json({ error: error });
  }
});

module.exports = router;
