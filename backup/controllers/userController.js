const express = require('express');
const User = require('../models/User');
const { upload } = require("../middleware/imageUploads");


//@desc register a user
//@route get /api/users/signup
//@acess public
const signupUser = async (req,res) => {
    if (!req.file) {
        res.status(400);
        throw new Error("Image is mandatory");
    }
    const {email,phone,name,password} = req.body;
    // if((!email && !phone) || !name || !password )
    // {
    //     res.status(400);
    //     throw new Error("Fields are mandatory");
    // }
    // const userAvailable = await User.findOne({email:email});
    // if(userAvailable)
    // {
    //     res.status(400);
    //     throw new Error("User already exists");
    // }
    
    try{
       
        const newUser = await User.create({
            name:name,
            email:email,
            phone:phone,
            imageName:req.file.filename,
            imagePath:req.file.path,
            password:password
            
        })
        res.json({"id":newUser._id,"email":newUser.email});
    }
    catch(err)
    {
        console.log(err);
    }
}

//@desc logins in a user
//@route get /api/users/login
//@acess public
const loginUser = async (req,res) => {
    
}

//@desc modify a user's details
//@route get /api/users/signup
//@acess private..as only logged in users can modify their details (picture,name)
const modifyUser = async (req,res) => {
    res.send("this is modify page");
}

//@desc delete a user
//@route get /api/users/delete
//@acess private..as only logged in users can delete their accounts
const deleteUser = async (req,res) => {
    res.send("this is delete page");
}


module.exports = {signupUser,loginUser,modifyUser,deleteUser};