// services/fileService.js
const multer = require("multer");

const storage = multer.memoryStorage();
const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB file size limit
  fieldSize: 1024 * 1024 * 1024, // Increased field size limit (adjust as needed)
};

const upload = multer({ storage, limits }).single("image");

const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error uploading file." });
    }
    next();
  });
};

module.exports = { handleFileUpload };
