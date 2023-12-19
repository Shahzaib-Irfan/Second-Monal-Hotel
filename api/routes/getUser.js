const express = require('express');
const crypto = require('crypto');
const router = express.Router();

const User = require('../models/user');

router.post('/', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        // console.log(email);

        const hashedPass = crypto.createHash('sha256').update(password).digest('hex');

        const savedUser =  await User.findOne({ email: email, password: hashedPass });
        
        if (savedUser) {
            res.send(savedUser);
        } else {
            res.status(500).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

module.exports = router;
