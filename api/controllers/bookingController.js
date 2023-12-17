const booking = require("../models/booking");
const rooms = require("../models/rooms");
const moment = require("moment");
const stripe = require("stripe")(
  "sk_test_51NdYl1BYQ4BHBkBzagwXHqFWzpPHzzotKdSE7KIZILc0IrfNgCGLrLnMBtvAQtbPaB6r5bkiUImTtcLNbJQr1Xhw008Jca4LL1"
);

async function createBooking(req, res) {
  try {
    const roomId = req.params.id;
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
      roomId: roomId,
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
      console.log(savedBooking._id);

      const room = await rooms.findOne({ _id: roomId });

      if (!room) {
        console.log("Room not found");
        return res.status(404).send("Room not found");
      }

      let SessionId = "";
      async function checkout(room, departureDate, arrivalDate) {
        const { roomNo, rate, image } = room;

        const unitAmount = 100 * Number(rate);
        const dayDifference =
          Number(departureDate.slice(8, 10)) - Number(arrivalDate.slice(8, 10));

        const quantity = dayDifference <= 0 ? 1 : dayDifference;

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "pkr",
                product_data: {
                  name: String(roomNo),
                  images: [`http://localhost:5000/images/${image}`],
                },
                unit_amount: unitAmount,
              },
              quantity,
            },
          ],
          mode: "payment",
          success_url: `http://localhost:3000/viewrooms`,
          cancel_url: "http://localhost:3000/viewrooms",
        });
        SessionId = session.id;

        return session.url;
      }
      booking
        .updateOne(
          {
            roomId: roomId,
            arrivalDate: arrivalDate,
            arrivalTime: arrivalTime,
            departureDate: departureDate,
            departureTime: departureTime,
          },
          { isPaid: true }
        )
        .then((res) => {
          if (res) console.log("Booking Updated");
          else console.log("error");
        });
      const url = await checkout(room, departureDate, arrivalDate);
      res.redirect(url);
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
