const mongoose = require("mongoose");

// DATABASE SCHEMA

const userSchema = mongoose.Schema({

    name:{
    type: String,
    required: true,

    },
    
    email:{
    type: String,
    unique: true,
    required: true,
    trim: true
    },
    
    password:{
    type: String,
    required: true
    },

    department:{
     type: String,
     required: true
    },
    
    role:{
    type: String,
    enum:["user"],
    default: "user"
    },

});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
