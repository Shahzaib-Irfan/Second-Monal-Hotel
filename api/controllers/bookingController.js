const booking = require("../models/booking");
const rooms = require("../models/rooms");
const moment = require("moment");

async function createBooking(req, res) {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const arrivalDate = req.body.dateArrival;
    const arrivalTime = req.body.timeArrival;
    const departureDate = req.body.dateDeparture;
    const departureTime = req.body.timeDeparture;
    const children = req.body.children;
    const adults = req.body.adults;
    const bookingData = {
      roomId: id,
      name: name,
      email: email,
      contact: contact,
      arrivalDate: arrivalDate,
      arrivalTime: arrivalTime,
      departureDate: departureDate,
      departureTime: departureTime,
      children: children,
      adults: adults,
      approvedStatus: null,
      isPaid: false,
    };

    const emailProviders = [
      "@gmail.com",
      "@yahoo.com",
      "@hotmail.com",
      "@outlook.com",
      "@aol.com",
      "@icloud.com",
      "@protonmail.com",
      "@live.com",
      "@inbox.com",
      "@zoho.com",
      "@gmx.com",
      "@yandex.com",
      "@mail.com",
      "@rocketmail.com",
      "@fastmail.com",
      "@mailinator.com",
      "@rediffmail.com",
      "@tutanota.com",
      "@dispostable.com",
      "@europe.com",
      "@hushmail.com",
      "@aim.com",
      "@msn.com",
      "@comcast.net",
      "@sbcglobal.net",
      "@cox.net",
      "@verizon.net",
      "@att.net",
      "@bellsouth.net",
      "@charter.net",
      "@earthlink.net",
      "@juno.com",
      "@netzero.net",
      "@me.com",
      "@mac.com",
    ];

    const regex = new RegExp(`(${emailProviders.join("|")})`, "i");
    if (regex.test(email) && name != "" && contact != "") {
      const savedBooking = booking.create(bookingData);
      res.status(201).redirect("http://localhost:3000/viewrooms");
    } else {
      console.log("Booking not added due to wrong email");
      res.redirect("http://localhost:3000/viewrooms");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getBookings(req, res) {
  try {
    const bookings = await booking.find({}); // extracts each and every document from the collection
    res.send(bookings); // sends back the resoponse to front-end
  } catch (err) {
    console.log(err);
    res.send(500).json({ error: err.message });
  }
}

async function getBookingsbyDates(req, res) {
  try {
    const startDate = new Date(req.params.dates.slice(0, 29));
    const formattedStartDate = startDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const endDate = new Date(req.params.dates.slice(30, 59));
    const formattedEndDate = endDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    var startDateNew = new Date(
      moment(formattedStartDate, "DD/MM/YYYY").toISOString()
    );
    var endDateNew = new Date(
      moment(formattedEndDate, "DD/MM/YYYY").toISOString()
    );
    const bookings = await booking.find({
      departureDate: { $gte: startDateNew },
      arrivalDate: { $lte: endDateNew },
    });

    console.log(bookings);

    const bookingIds = bookings.map((doc) => doc.roomId);

    // Use `exec` to convert the cursor to a promise resolving to an array
    const roomData = await rooms.find({ _id: { $nin: bookingIds } }).exec();

    res.json(roomData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createBooking,
  getBookings,
  getBookingsbyDates,
};
