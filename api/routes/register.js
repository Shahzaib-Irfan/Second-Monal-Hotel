const express = require('express')
const crypto = require('crypto')
const router = express.Router()

const User = require('../models/user')

router.post('/', async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    const hashedPass = crypto.createHash('sha256').update(password).digest('hex')
    //const password = crypto.createHash('sha256').update(req.body.password).digest('hex')

    const roleAsUser = 2
    const newUser = new User({
        name: name,
        email: email,
        password: hashedPass,
        role: roleAsUser
    });

    newUser.save()
      .then(savedUser => {
        res.send(200)
      })
      .catch(error => {
        res.send({message : 'Unsuccess'})
      })
})

module.exports = router;