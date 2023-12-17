const rooms = require("../models/rooms");

async function createRoom(req, res) {
  try {
    const roomNo = req.body.roomNo;
    const description = req.body.description;
    const roomType = req.body.roomType;
    const servantName = req.body.servantName;
    const servantContact = req.body.servantContact;
    const rate = Number(req.body.rate);
    const image = req.file.filename;
    const availabilityStatus =
      req.body.availabilityStatus === "True" ? true : false;
    const room = {
      roomNo: roomNo,
      description: description,
      roomType: roomType,
      servantName: servantName,
      servantContact: servantContact,
      image: image,
      rate: rate,
      availabilityStatus: availabilityStatus,
    };

    const savedRoom = await rooms.create(room); //inserts object in database

    res.status(201).redirect("http://localhost:3000/managerooms"); // redirects the front end to some page
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getDishes(req, res) {
  try {
    const products = await Dish.find({}); // extracts each and every document from the collection
    res.send(products); // sends back the resoponse to front-end
  } catch (err) {
    console.log(err);
    res.send(500).json({ error: err.message });
  }
}

// gets dish by restaurantID
async function getDishesByRID(req, res) {
  try {
    const products = await Dish.find({ restaurantID: req.params["id"] }); // gets a single dish
    res.send(products);
  } catch (err) {
    console.log(err);
    res.send(500).json({ error: err.message });
  }
}

// gets a dish by DishID
async function getDish(req, res) {
  try {
    const id = req.params.id; // extracts the id sent by the frontend
    const product = await Dish.findById(id);
    res.send(product);
  } catch (err) {
    console.log(err);
    res.send(500).json({ error: err.message });
  }
}

async function updateDish(req, res) {
  try {
    const file = req.file.filename;
    const product = await Dish.updateOne(
      { _id: req.params["id"] },
      {
        name: req.body["dishName"],
        description: req.body["description"],
        type: req.body["dishType"],
        ingredients: req.body["ingredients"],
        price: req.body["price"],
        image: file,
      }
    );
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteDish(req, res) {
  try {
    const product = await Dish.deleteOne({ _id: req.params["id"] });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createRoom,
};
