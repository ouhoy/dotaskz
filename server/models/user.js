const mongoose = require("mongoose");

// User schema

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
   
    role:{
       type: String,
       default: "subscriber" 
    },
    resetPasswordLink:{
        data: String,
        default: ""
    },
    theme:{
        data: String,
        default: ""
    }
}, {timestamps: true})  // recording time



module.exports = mongoose.model("User" , userSchema);