const express = require('express');
const router = express.Router();
const Room = require('../models/rooms');

router.get('/getAllrooms', async (req, res) => {
    try {
        const rooms = await Room.find({});
        return res.json({ rooms });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
