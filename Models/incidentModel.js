const mongoose = require("mongoose");

// INCIDENT SCHEMA
const incidentSchema = mongoose.Schema({
    
    IncidentNo: {
     type: String,
     required: true,
    },

    MeanTime: {
    type: String,
    required: true,
    },

    DetectionTime: {
    type: String,
    required: true,
    },

    ResponseTime: {
    type: String,
    required: true,
    },

    TypeOfAttack: {
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

    Investigator: {
        type: String,
        required: true,
        },
    

    Action: {
    type: String,
    required: true,    
    },

    ReportedBy: {
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

const incidentModel = mongoose.model("Incident", incidentSchema);

module.exports = incidentModel;