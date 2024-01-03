const express = require('express');
const { signupUser, loginUser, modifyUser, deleteUser,getDetails } = require('../controllers/userController');
const { upload } = require("../middleware/imageUploads");
const validateUser = require("../middleware/UserValidation");
const validateToken = require("../middleware/validateTokenHandler");
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

//to get user information
router.get("/getDetails",validateToken,getDetails)

// router.put("/modify",validateToken ,modifyUser);
router.put("/modify",validateToken,async (req, res, next) => { 
  return new Promise((resolve, reject) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
    .then(() => modifyUser(req, res))
    .catch((error) => {
    //   console.log(error); //? uncomment if you wanna see the error
    });
});


router.delete("/delete",validateToken, deleteUser);

module.exports = router;
