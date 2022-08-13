const mongoose = require("mongoose");

// INCIDENT SCHEMA
const incidentSchema = mongoose.Schema({
    
    incidentNo: {
     type: String,
     required: true,
    },

    date: {
    type: String,
    required: true,
    },

    typeOfAttack: {
    type: String,
    required: true,
    },

    source : {
    type: String,
    required: true,

    },

    Destination : {
    type: String,
    required: true,
    
    },

    reason: {
    type: String,
    required: true,
    },

    action: {
    type: String,
    required: true,    
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }    
})

const incidentModel = mongoose.model("Incident", incidentSchema);

module.exports = incidentModel;