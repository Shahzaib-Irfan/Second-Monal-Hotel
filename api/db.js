// const mongoose = require('mongoose');
// mongoose.set('strictQuery',true);

// mongoose.connect('mongodb://127.0.0.1:27017/SecondMonal' , {
//     useNewUrlParser:true,
// });

// const db = mongoose.connection;
// db.on('error', (err) => {
//     console.log('Failed tp connect with db');
// });
// db.once('open', () => {
//     console.log('Connected with db');
// });

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://shahzaibirfan1012:jW99nWH0cstu1e1B@termproject.d0usvgi.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

var db = mongoose.connection;
db.on("error", () => console.log("error"));
db.once("open", () => console.log("Database Connected"));

module.exports = { db };
