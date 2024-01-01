const express = require('express');
const User = require('../models/User');
const { upload } = require("../middleware/imageUploads");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const result = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {

        // console.log(filePath);
        const absolutePath = `E:\\Web-Development\\NodeJs\\UserAdmin App\\${filePath}`;

        fs.unlink(absolutePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${filePath}`);
                console.error(err);
                reject(err);
                return;
            }

            // console.log(`File deleted successfully: ${filePath}`);
            resolve();
        });
    });
};


//@desc register a user
//@route get /api/users/signup
//@acess public
const signupUser = asyncHandler(async (req,res) => {
    
    const {phone,email,name,password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10); // here 10 is the level of salting
    if(!email)
    {
        try{
            const newUser = await User.create({
                name:name,
                phone:phone,
                imageName:req.file.filename,
                imagePath:req.file.path,
                password:hashedPassword,
                
            })
            res.send("user created successfully");
        }
        catch(err)
        {
           
            console.log(err);
            res.end();
        }
    }
    
    else if(!phone)
    {
        try{
            const newUser = await User.create({
                name:name,
                email:email,
                imageName:req.file.filename,
                imagePath:req.file.path,
                password:hashedPassword
                
            })
            res.send("user created successfully");

        }
        catch(err)
        {
           
            console.log(err);
            res.end();
        }
    }
    else{
        try{
            const newUser = await User.create({
                name:name,
                email:email,
                phone:phone,
                imageName:req.file.filename,
                imagePath:req.file.path,
                password:hashedPassword,
                
            })
            res.send("user created successfully");

        }
        catch(err)
        {
           
            console.log(err);
            res.end();
        }
    }
    
        
    
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
})

//@desc logins in a user
//@route get /api/users/login
//@acess public
const loginUser =asyncHandler( async (req, res) => {
    const { email, phone, password } = req.body;
    console.log(`email:${email} ; phone:${phone} ; password:${password}`);
    if (!(email || phone)) {
        res.status(400);
        throw new Error("Email or phone is required");
    } 
    if(!password)
    {
        res.status(400);
        throw new Error("Password is required");
    }
    let user;
    if(!email)
    {
        user = await User.findOne({phone:phone});
    }
    else{
        user = await User.findOne({email:email});
    }
    console.log(user);
    if(user && (await bcrypt.compare(password,user.password)))
    {
        const jwtToken =  jwt.sign({user:{
            email:user.email,
            id:user._id,
            phone:user.phone,
        }},process.env.JWT_SECRET,{expiresIn:"15m"});
        res.status(200).json({"accessToken":jwtToken}); 
    }
    else{
        res.status(401);
        throw new Error("Kindly recheck credentials");
    }


})


//@desc modify a user's details
//@route get /api/users/signup
//@acess private..as only logged in users can modify their details (picture,name)
const modifyUser = asyncHandler(async (req,res) => {
    // this will first decode the jwt token and get the email id or phone number of the user.
    // then based on it, it will search for the user in the databse
    // then it will modify the name and image according to request
    // for name it can directly modify, but for file, it needs to write path to the new file in the db and delete the earlier file
    let email = req.user.email;
    let phone = req.user.phone;
    let user;
    
    if (email || phone) {
        // search by either email or phone
        if(email)
        {
            user = await User.findOneAndUpdate({ email :email},{
                name:req.body.name,
                imageName:req.file.filename,
                imagePath:req.file.path,
            },{new:false});
           await deleteFile(user.imagePath);
            
        }
        else{
            user = await User.findOneAndUpdate({ phone :phone},{
                name:req.body.name,
                imageName:req.file.filename,
                imagePath:req.file.path,
            },{new:false});
            await deleteFile(user.imagePath);
        }
        res.send("user modified");
    }
    // if(req.file)
    // {
    //     console.log(true);
    // }
    // else{
    //     console.log(false);

    // }

})

//@desc delete a user
//@route get /api/users/delete
//@acess private..as only logged in users can delete their accounts
const deleteUser = asyncHandler(async (req,res) => {
    let email = req.user.email;
    let phone = req.user.phone;    
    if (email || phone) {
        // search by either email or phone
        let user;
        if(email)
        {
           user = await User.findOneAndDelete({email:email});
        }
        else{
           user = await User.findOneAndDelete({phone:phone});    
        }
        deleteFile(user.imagePath);
        console.log(user);
        res.send("user deleted successfully");
    }
})


module.exports = {signupUser,loginUser,modifyUser,deleteUser};