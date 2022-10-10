const multer = require('multer');
path = require("path");

const videoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (file.mimetype === "video/mp4" || file.mimetype ==='video/webm') {
        cb(null, path.join(__dirname, "../files"));
      } else {
        cb({ message: "This file is not in video format." }, false);
      }
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  module.exports = {
    videoUpload: multer({ storage: videoStorage }),
  };