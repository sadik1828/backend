const mongoose = require("mongoose");

// INCIDENT SCHEMA
const offenseSchema = mongoose.Schema({
    OffenseNo: {
    type: String,
    required: true,
    },

    OffenseDate: {
    type: String,
    required: true,
    },

    UserAccount: {
    type: String,
    required: true,
    },

    Source : {
    type: String,
    required: true,

    },

    Destination : {
    type: String,
    required: true,
    
    },

    Reason: {
    type: String,
    required: true,
    },

    Action: {
    type: String,
    required: true,    
    },

    Shift: {
    type: String,
    required: true,    
    },

    Status: {
    type: String,
    required: true,    
    },

     Department:{
     type: String,
     required: true
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }    
})

const offenseModel = mongoose.model("Offense", offenseSchema);

module.exports = offenseModel;