const express = require('express');
const {signupUser,loginUser,modifyUser,deleteUser} = require('../controllers/userController');
const router = express.Router();

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.put("/modify",modifyUser);
router.delete("/delete",deleteUser);


module.exports = router;