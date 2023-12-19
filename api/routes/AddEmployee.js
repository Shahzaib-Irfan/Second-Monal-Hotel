const express = require('express')
const router = express.Router()

const Employee = require('../models/employee')

router.post('/', async (req,res) => {
    const {name,cnic,phone} = req.body
    console.log(phone)

    // console.log(name,cnic,phoneNumber)
    try{
        const newEmployee = new Employee({name,cnic,phone})
        await newEmployee.save()
        res.sendStatus(200)
    }catch(error){
        console.error(error)
        res.sendStatus(403)
    }
        
   
})

module.exports = router