const express = require('express');
const User = require('../models/User');
const multer = require("multer");
const fs = require('fs');
const path = require('path');

const deleteFile = (filePath) => {
    return new Promise((resolve, reject) => {
      
        // console.log(filePath);
        const absolutePath =  `E:\\Web-Development\\NodeJs\\UserAdmin App\\${filePath}`;
   
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


const validateUser = async(req,res,next)=>{
    
    const {email,phone,name,password} = req.body;
    // console.log(email,phone,name,password);
    if((!email && !phone) || !name || !password )
    {
        res.status(400);
        await deleteFile(req.file.path);
        throw new Error("Fields are mandatory");
    }
    const userAvailable = await User.findOne({email:email});
    if(userAvailable)
    {
        res.status(400);
        await deleteFile(req.file.path);
        throw new Error("User already exists");
        
    }
    next();
}

module.exports = validateUser;
    