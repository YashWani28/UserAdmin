const express = require('express');
const asyncHandler = require("express-async-handler");
const Admin  = require('../models/Admin');

const validateAdmin = asyncHandler(async(req,res,next)=>{

    const {username,role} = req.user;
    

    if(role==="admin")
    {
        // double check in database to see if admin corressponding to the info in jwt token is present in database
        const admin = await Admin.findOne({adminName:username});
        if(admin)
        {
            next();
        }
        else{
            // req.user = {"deleteImage":true}
            res.status(403);
            throw new Error("JWT token not valid");
        }
    }
    else{
        // req.user = {"deleteImage":true}
        res.status(403);
        throw new Error("Only admins can access this url");
    }
})

module.exports = validateAdmin