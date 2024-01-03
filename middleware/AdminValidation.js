const express = require('express');
const asyncHandler = require("express-async-handler");
const Admin  = require('../models/Admin');

const validateAdmin = asyncHandler(async(req,res,next)=>{
    // res.user.role
    
    console.log(req.user);
    const {username,role} = req.user;
    console.log(username,role);
    if(role==="admin")
    {
        // double check in database to see if admin corressponding to the info in jwt token is present in database
        const admin = await Admin.findOne({adminName:username});
        if(admin)
        {
            next();
        }
        else{
            res.status(403);
            throw new Error("JWT token not valid");
        }
    }
    else{
        res.status(403);
        throw new Error("Only admins can access this url");
    }
})

module.exports = validateAdmin