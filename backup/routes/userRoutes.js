const express = require('express');
const { signupUser, loginUser, modifyUser, deleteUser } = require('../controllers/userController');
const { upload } = require("../middleware/imageUploads");
const validateUser = require("../middleware/UserValidation");
const router = express.Router();
const multer = require("multer");

router.post("/signup", (req, res) => {
  return new Promise((resolve, reject) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
    .then(() => validateUser(req, res))
    .then(() => signupUser(req, res))
    .catch((error) => {
      // Handle errors
      res.status(500).send("Error during signup: " + error.message);
    });
});

router.post("/login", loginUser);
router.put("/modify", modifyUser);
router.delete("/delete", deleteUser);

module.exports = router;
