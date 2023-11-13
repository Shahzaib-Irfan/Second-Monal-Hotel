// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// router.post('/register', async (req, res) => {
//     const New_User = new User({name : req.body.name , email : req.body.email , password : req.body.password});
//     try {
//         const user  = await New_User.save();
//         res.send("User successfully registered")
//     } catch (error) {
         
//         return res.status(400).json({ error: 'Server Error' });
//     }
// });



// router.post('/login', async (req, res) => {
//     const {email , password} = req.body;
//     try {
//         const user  = await User.findOne({email : email , password : password });
//         if(user)
//         {
//             res.send(user);
//         }
//         else
//         {
//             return res.status(400).json({ message: 'Login Failed' });
//         }
//     } catch (error) {
         
//         return res.status(400).json({ error: 'Server Error' });
//     }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Ensure required fields are provided in the request body
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Please provide all required fields.' });
        }

        // Check if the user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // You may want to send back the saved user details or a success message
        res.json({ message: 'User successfully registered', user: savedUser });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user with the provided email
        const user = await User.findOne({ email });

        // Check if the user exists and the password is correct
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({ message: 'Login successful', user });
        } else {
            return res.status(400).json({ message: 'Login Failed' });
        }
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
