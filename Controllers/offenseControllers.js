const Offense = require("../Models/offensesModel");


exports.create = async(req, res) =>{
    try {
        
        // find attack with same number
        const offenseFound = await Offense.findOne({OffenseNo: req.body.OffenseNo})

        // if same attack number is found send and error
        if (offenseFound){
            return res.status(401).json({clientMessage: "same attack id is found"});
        }

        // save the offense
        await Offense.create(req.body);
        res.status(200).json({clientMessage: "offense is created"});


    } catch (e) {
        console.log(e.message);
        res.status(400).json({clientMessage: "error"});
    }
};

///////////////////////////////////////////////////////////////////////////////

// GET ALL THE ATTACKS ONE TIME

exports.getAll = async(req, res) =>{
    try {
        // find all attack numbers
        // incidents has the data of all incidents

       const offenses = await Offense.find({});
       res.status(200).json({ found: offenses.length,  offenses });


    } catch (error) {
        res.status(401).json({clientMessage: "error"});
    }
};


///////////////////////////////////////////////////////////////////

// GET ONLY ONE ATTACK

exports.get = async(req, res) =>{
    try {
      const offense = await Offense.findById(req.params.id);
        res.status(200).json({clientMessage: "found", offense});
    } catch (error) {
        res.status(401).json({clientMessage: "error occured"});
        
    }
};

////////////////////////////////////////////////////////////////
// EDIT INCIDENT

exports.editOffense = async(req, res)=>{
    try {
        await Offense.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({clientMessage: "edited offense attack"});


    } catch (error) {
        res.status(400).json({clientMessage: "error"});
    }
};


////////////////////////////////////////////////////////////////
// DELETED INCIDENT

exports.deleteOffense = async(req, res)=>{
    try {
        await Offense.findByIdAndDelete(req.params.id);
        res.status(200).json({clientMessage: "deleted offense attack"});


    } catch (error) {
        res.status(400).json({clientMessage: "error"});
    }
};

////////////////////////////////////////////////////


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

