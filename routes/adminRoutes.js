const express = require("express");
const router = express.Router();
const {createAdmin,loginAdmin,getAllUsers,modifyUser,deleteUser} = require('../controllers/adminController');
const validateToken = require('../middleware/validateTokenHandler');
const validateAdmin = require('../middleware/AdminValidation');
const { upload1 } = require("../middleware/adminImageUpload");
const fs = require('fs');

// create admin acount
router.post('/createAdmin',createAdmin);

// login admin account
router.post('/loginAdmin',loginAdmin);

// get method to get information of all users
router.get('/getAllUsers',validateToken,validateAdmin,getAllUsers)

// modify method to modify info of existing users
router.put("/modifyUser/:id",validateToken,upload1.single("image"),validateAdmin,async(req,res,next)=>{
    const buffer = req.file.buffer;
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileName = `${uniqueSuffix}_${req.file.originalname}`;
    const filePath = `uploads/${fileName}`;
    await fs.writeFile(filePath, buffer,(err) => {
        if (err) {
            throw err; 
        }});
    req.file.filename = fileName;
    req.file.path = filePath;
    modifyUser(req,res,next)
})

// delete users
router.delete("/deleteUser/:id",validateToken,validateAdmin,deleteUser);
module.exports = router;