const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
    {
        adminName:{
            type: String,
            required:[true,'Admin Name is required!'],
            unique: [true,"Admin name already taken"],

        },
        password:{
            type:String,
           required: [true,"Please add password"],
        }

    }
)

module.exports = mongoose.model("Admin",adminSchema);