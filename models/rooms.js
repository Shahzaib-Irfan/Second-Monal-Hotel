const mongoose = require("mongoose");

const room_schema = mongoose.Schema(
  {
    roomNo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    roomType: {
      type: String,
      required: true,
    },
    servantName: {
      type: String,
      required: true,
    },
    servantContact: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    availabilityStatus: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const roomModel = mongoose.model("rooms", room_schema);

module.exports = roomModel;
