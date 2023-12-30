const express = require('express');
const User = require('../models/User');
const { upload } = require("../middleware/imageUploads");


//@desc register a user
//@route get /api/users/signup
//@acess public
const signupUser = async (req,res) => {
    
    const {email,phone,name,password} = req.body;
   
       
    const newUser = await User.create({
        name:name,
        email:email,
        phone:phone,
        imageName:req.file.filename,
        imagePath:req.file.path,
        password:password
        
    })
        
    
    // try{
       
    //     const newUser = await User.create({
    //         name:name,
    //         email:email,
    //         phone:phone,
    //         imageName:req.file.filename,
    //         imagePath:req.file.path,
    //         password:password
            
    //     })
    //     // if(newUser)
    //     // {
    //     //     return res.status(201).json({"id":newUser._id,"email":newUser.email});
    //     //     return res.send("success")
    //     //?  Cannot set headers after they are sent to the client
    //     // }
    // }
    // catch(err)
    // {
    //     // console.log('error here');
    //     console.log(err);
    // }
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