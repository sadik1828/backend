const mongoose = require("mongoose");

// INCIDENT SCHEMA
const incidentSchema = mongoose.Schema({

    date: {
    type: number,
    required: true,
    },

    typeOfAttack: {
    type: String,
    required: true,
    },

    ip : {
    type: number,
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