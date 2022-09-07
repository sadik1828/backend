const Incident = require("../Models/incidentModel");


exports.create = async(req, res) =>{
    try {
        // find attack with same number
        const attackFound = await Incident.findOne({IncidentNo: req.body.IncidentNo})

        // if same attack number is found send and error
        if (attackFound){
            return res.status(401).json({clientMessage: "same incident is found"});
        }

        // save the attack
        await Incident.create(req.body);
        res.status(200).json({clientMessage: "incident no. is created"});


    } catch (error) {
        res.status(400).json({clientMessage: "error creation"});
    }
};

///////////////////////////////////////////////////////////////////////////////

// GET ALL THE ATTACKS ONE TIME

exports.getAll = async(req, res) =>{
    try {
        // find all attack numbers
        // incidents has the data of all incidents

       const incidents = await Incident.find({});
       res.status(200).json({ found: incidents.length, incidents });


    } catch (error) {
        res.status(401).json({clientMessage: "error"});
    }
};


///////////////////////////////////////////////////////////////////

// GET ONLY ONE ATTACK

exports.get = async(req, res) =>{
    try {
      const incident = await Incident.findById(req.params.id);
        res.status(200).json({clientMessage: "found", incident});
    } catch (error) {
        res.status(401).json({clientMessage: "error occured"});
        
    }
};

////////////////////////////////////////////////////////////////
// EDIT INCIDENT

exports.editIncident = async(req, res)=>{
    try {
        await Incident.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({clientMessage: "edited incident"});


    } catch (error) {
        res.status(400).json({clientMessage: "error"});
    }
};


////////////////////////////////////////////////////////////////
// DELETED INCIDENT

exports.deleteIncident = async(req, res)=>{
    try {
        await Incident.findByIdAndDelete(req.params.id);
        res.status(200).json({clientMessage: "deleted incident"});


    } catch (error) {
        res.status(400).json({clientMessage: "error"});
    }
};


///////////////////////////////////////////////////


exports.protect = (req,res, next ) => {
    try {
    const token= req.headers.authentication
    // 1. token is empty
    if (!token){
        return res.status(401).json({clientMessage: "you are not logged in"});
    }
    
    // 2. token is verify
    jwt.verify(token, process.env.JWTSECRET, function(err, decoded){
     
        if (err){
            return res.status(400).json({clientMessage: "login session expire"});
        }
        console.log(decoded.data);
        req.userInfo = decoded.data
    });
    
        next();
    } catch (e) {
    
        console.log(e.message)
        res.status(400).json({clientMessage: "error"});
    }
    
    };
    
    
    
    
    exports.checkUser = (res,req, next ) => {
        try {
        const token= req.headers.authentication
        // 1. token is empty
        if (!token){
            return res.status(401).message({clientMessage: "you are not logged in"});
        }
        
        // 2. token is verify
        jwt.verify(token, process.env.JWTSECRET, function(err, decoded){
         
            if (err){
                return res.status(400).json({clientMessage: "login session expire"});
            }
          
        });
        
         res.status(200).json({clientMessage: "Correct User"});
        } catch (e) {
            return res.status(400).json({clientMessage: "error"});
        }
        
        };
