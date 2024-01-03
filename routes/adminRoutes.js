const express = require("express");
const router = express.Router();
const {createAdmin,loginAdmin,getAllUsers} = require('../controllers/adminController');
const validateToken = require('../middleware/validateTokenHandler');
const validateAdmin = require('../middleware/AdminValidation');

// create admin acount
router.post('/createAdmin',createAdmin);
// login admin account
router.post('/loginAdmin',loginAdmin);
// get method to get information of all users
router.get('/getAllUsers',validateToken,validateAdmin,getAllUsers)
// modify method to modify info of existing users

// delete users

module.exports = router;