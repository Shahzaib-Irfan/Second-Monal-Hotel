const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    arrivalDate: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    children: {
      type: Number,
      required: true,
    },
    adults: {
      type: Number,
      required: true,
    },
    approvedStatus: {
      type: Boolean,
    },
    isPaid: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const BookingModel = mongoose.model("booking", bookingSchema);

module.exports = BookingModel;
