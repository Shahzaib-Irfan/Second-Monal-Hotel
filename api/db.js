const { default: mongoose } = require("mongoose");

let mongoURL = 'mongodb+srv://2021cs12:spd3btg2@afraz1.axg4vae.mongodb.net/tiers-hotel-app'

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser: true})

var con = mongoose.connection

con.on('error', () => {
    console.log(`Error connecting to database`)
})

con.on('connected', () => {
    console.log(`Connected to the Database`)
})

module.exports = mongoose