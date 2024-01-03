const express = require('express');
const User = require('../models/User');
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const asyncHandler = require("express-async-handler");


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


const validateUser = asyncHandler(async (req, res, next) => {

    const { email, phone, name, password } = req.body;
    // console.log(email, phone, name, password);

    if ((!email && !phone) || !name || !password) {
        await deleteFile(req.file.path);
        res.status(400);

        throw new Error("Fields are mandatory");

    }

    let userAvailable;
    // console.log(userAvailable);
    if (email || phone) {
        // Check for either email or phone
        if(email)
        {
            userAvailable = await User.findOne({ email :email});
            
        }
        else{
            userAvailable = await User.findOne({ phone :phone});

        }
    }
    // console.log(userAvailable);
    if (userAvailable) {
        await deleteFile(req.file.path);
        res.status(400);
        throw new Error("User already exists");
    }

})

module.exports = validateUser;
