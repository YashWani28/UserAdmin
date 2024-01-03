const express = require('express');
const asyncHandler = require("express-async-handler");
const result = require('dotenv').config();
const Admin = require('../models/Admin');
const User = require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs');


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

//@desc create admin when request has username,and admin creation key
//@route post /api/users/createAdmin
//@acess public
const createAdmin = asyncHandler(async(req,res)=>{
    const {username,adminKey,password} = req.body;
    // console.log(username,adminKey,password);
    if(!username || !adminKey || !password)
    {
        res.status(400);
        throw new Error("Please provide the required credentials");
    }
    if(adminKey===process.env.ADMIN_CREATION_SECRET){
        const hashedPassword = await bcrypt.hash(password,10); // here 10 is the level of salting
        Admin.create({
            adminName:username,
            password:hashedPassword
        })
        res.json({"success":"true"});
    }
    else{
        res.status(403);
        throw new Error("You must provide admin key in order to create an admin account !!");
    }
})


//@desc login admin by verifying username and password
//@route post /api/users/loginAdmin
//@acess public
const loginAdmin = asyncHandler(async(req,res)=>{
    const {username,password} = req.body;
    // console.log(username,password);
    if(!username || !password)
    {
        res.status(400);
        throw new Error("Please provide the required credentials");
    }
    const admin = await Admin.findOne({adminName:username});
    // console.log(admin);
    if(admin && (await bcrypt.compare(password,admin.password)))
    {
        const jwtToken = jwt.sign({
            user:{
                username:admin.adminName,
                role:"admin",
            }
        },process.env.JWT_SECRET,{expiresIn:"1h"})
        res.status(200).json({"accessToken":jwtToken});
    }
    else{
        res.status(401);
        throw new Error("Kindly recheck credentials");
    }
})


//@desc get all users 
//@route get /api/users/getAllUsers
//@acess private...admin role verified and entry checked in database
const getAllUsers = asyncHandler(async(req,res)=>{
    const users =await User.find({});
    
    res.json({"users":users});
})

//@desc modify user
//@route put /api/users/modifyUser
//@acess private...
const modifyUser = asyncHandler(async(req,res)=>{
    //here we will find one user on the basis of the user id that the admin provided in the request body
    console.log(req.file.filename,req.file.path);
    console.log(req.body);
    const {email,phone} = req.body;
    if(email || phone)
    {
        if(email)
        {
            let user =await User.findOneAndUpdate({_id:req.params.id},{
                name:req.body.name,
                phone:req.body.phone,
                password:  await bcrypt.hash(req.body.password,10),
                imageName:req.file.filename,
                imagePath:req.file.path,
            },{new:false});
        
            await deleteFile(user.imagePath);
            res.send("User modified successfully")

        }
        else{
            let user =await User.findOneAndUpdate({_id:req.params.id},{
                name:req.body.name,
                email:req.body.email,
                password:  await bcrypt.hash(req.body.password,10),
                imageName:req.file.filename,
                imagePath:req.file.path,
            },{new:false});
        
            await deleteFile(user.imagePath);
            res.send("User modified successfully")
        }
    }
    else if(email && phone)
    {
        let user =await User.findOneAndUpdate({_id:req.params.id},{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:  await bcrypt.hash(req.body.password,10),
            imageName:req.file.filename,
            imagePath:req.file.path,
        },{new:false});
    
        await deleteFile(user.imagePath);
        res.send("User modified successfully")
    }
    


})

//@desc delete user
//@route delete /api/users/modifyUser
//@acess private...
const deleteUser = asyncHandler(async(req,res)=>{

    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const imagePath = user.imagePath; 

    await User.findByIdAndDelete(req.params.id);

    await deleteFile(imagePath);

    res.send("User deleted successfully");
})

module.exports = {createAdmin,loginAdmin,getAllUsers,modifyUser,deleteUser};