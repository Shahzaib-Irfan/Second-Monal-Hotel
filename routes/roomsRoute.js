const express = require("express");
const router = express.Router();
const Room = require("../models/rooms");
const roomsController = require("../controllers/roomsController");

const upload = require("../utils/uploadMiddleware");

router.post("/rooms", upload.single("image"), roomsController.createRoom);
router.get("/rooms/getRooms", roomsController.getRooms);
router.get("/rooms/getSingleRoom/:id", roomsController.getRoom);

router.get("/getAllrooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.json({ rooms });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
});

router.get("/getroombyid/:id", async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findOne({ _id: roomId });
    return res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
