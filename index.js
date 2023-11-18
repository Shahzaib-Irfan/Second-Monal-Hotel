// const express = require('express');

// const app = express();
// require('./db');
// const roomRoute = require('./routes/roomsRoute')

// app.use('/api/rooms' , roomRoute)

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server is running on my port ${port}`);
// });
const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
require('./db');
const roomRoute = require('./routes/roomsRoute');
const userRoute = require('./routes/UserRoute');
const bookRoute = require('./routes/BookingRoute');

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.use('/api/rooms', roomRoute);
app.use('/api/users', userRoute);
app.use('/api/bookings', bookRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on my port ${port}`);
});
