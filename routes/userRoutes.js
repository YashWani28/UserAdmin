const express = require('express');
const { signupUser, loginUser, modifyUser, deleteUser } = require('../controllers/userController');
const { upload } = require("../middleware/imageUploads");
const validateUser = require("../middleware/UserValidation");
const router = express.Router();
const multer = require("multer");

router.post("/signup", (req, res, next) => { 
  return new Promise((resolve, reject) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
    .then(() => validateUser(req, res, next))
    .then(() => signupUser(req, res))
    .catch((error) => {
    //   console.log(error); //? uncomment if you wanna see the error
    });
});

router.post("/login", loginUser);
router.put("/modify", modifyUser);
router.delete("/delete", deleteUser);

module.exports = router;
