const express = require('express');
const asyncHandler = require("express-async-handler");
const result = require('dotenv').config();
const Admin = require('../models/Admin');
const User = require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//@desc create admin when request has username,and admin creation key
//@route get /api/users/createAdmin
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
//@route get /api/users/loginAdmin
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
        },process.env.JWT_SECRET,{expiresIn:"15m"})
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
//@route get /api/users/modifyUser
//@acess private...
const modifyUser = asyncHandler(async(req,res)=>{

})
module.exports = {createAdmin,loginAdmin,getAllUsers};