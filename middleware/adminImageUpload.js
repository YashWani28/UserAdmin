const multer = require("multer");

const storage = multer.memoryStorage();

const upload1 = multer({ storage: storage });

module.exports = { upload1 };
