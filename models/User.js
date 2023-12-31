const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required:[true,'Name is required!'],
        },
        email:{
            type:String,
            // required: [true,"Please add user email address"],
            unique: [true,"Email address already taken"],
            sparse:true,

        },
        phone:{
            type:String,
            // required: [true,"Please add user phone number"],
            unique: [true,"Phone already taken"],
            sparse:true,
        },
        imageName:{
            type:String,
            required: true,
        },
        imagePath:{
            type:String,
            required:true,
        },
        password:{
            type:String,
           required: [true,"Please add password"],
        }

    }
)

module.exports = mongoose.model("User",userSchema);