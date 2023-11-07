const express = require('express');

const app = express();
require('./db');
const roomRoute = require('./routes/roomsRoute')

app.use('/api/rooms' , roomRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on my port ${port}`);
});
