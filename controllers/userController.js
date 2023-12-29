const express = require('express');

//@desc register a user
//@route get /api/users/signup
//@acess public
const signupUser = async (req,res) => {
    res.json(req.body);
}

//@desc logins in a user
//@route get /api/users/login
//@acess public
const loginUser = async (req,res) => {
    res.send("this is login page");
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