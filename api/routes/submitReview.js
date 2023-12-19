const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
    const { email, subject, text } = req.body;

    // Replace with your SMTP configuration
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // e.g., 'Gmail', 'Outlook'
        auth: {
            user: 'afraz.jed.grw@gmail.com',
            pass: 'omjbeioyqvbuxysl'
        }
    });

    const mailOptions = {
        from: 'afraz.jed.grw@gmail.com', // Sender email address
        to: '2021cs12@student.uet.edu.pk', // Recipient email address
        subject: subject, // Email subject
        text: 'This is placeholder text for email' // Email body
    };

    try {
        // Send email
        console.log(text)
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});

module.exports = router;

