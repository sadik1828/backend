const User = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


// TOKEN FUNCTION

async function createToken(value){
    const token = await jwt.sign({
        expiresIn: "1h",
        data: value,
     }, 
     process.env.JWTSECRET
     );

     return token
}


/////////////////////////////////////////////
// SIGNUP PART

exports.userSignUp = async(req, res)=>{
try {
    // check if email exist
    const userInfo = await User.findOne({email: req.body.email}) 

    if (userInfo){
        return res.status(401).json({clientMessage: "email already exist"})
        res.status(200).json({message: "success"});
        
    }

    // password.length >7
    if (req.body.password.length < 7) {
        return res.status(400).json({ clientMessage: "password less than seven" });
    }

    // check if email password === confirm password
    if (req.body.password !== req.body.confirmPassword){
        return res.status(401).json({clientMessage: "password does not match"});
    }


    // encrypt the password

   const encryptPassword =  await  bcrypt.hash(req.body.password, 10)
   req.body.password = encryptPassword;

// create new user
   await User.create(req.body);
//    res.status(200).json({clientMessage: "user is created"});



    // create token
    const token = await createToken(req.body.email)
        
    res.status(200).json({ clientMessage: "user is created", token });
    console.log(token)


} catch (e) {
    res.status(401).json({clientMessage:"error signup"})
    console.log(e.message);
}
};


/////////////////////////////////////////////////////////////////////////
// LOGIN PART


exports.login = async(req, res) => {
    try {
        // checking if user already exist in the database
        const userInfo = await User.findOne({email: req.body.email});
        
        // if user not found send your not found
        if (!userInfo){
            return res.status(401).json({clientMessage: "user to found"});
        }

        // comparing the database password and login password
       const comparePassword = await bcrypt.compare(req.body.password, userInfo.password)

       // if both password does not match
       if (!comparePassword){
        return res.status(401).json({clientMessage: "Email or Password is incorrect"});
       
       }

// create token

 const token = await createToken(userInfo.email)

 //send success login message
 res.status(200).json({ clientMessage: "loggin success", token });


    //    // send success login message
    //    res.status(200).json({clientMessage: "loggin success"});


    } catch (e) {
      res.status(400).json({clientMessage: "error"});
    }
}
/////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

// GET ALL THE USERS ONE TIME

exports.getAll = async(req, res) =>{
    try {
        // find all attack numbers
        // incidents has the data of all incidents

       const allUsers = await User.find({});
       res.status(200).json({ found: allUsers.length, allUsers });


    } catch (error) {
        res.status(401).json({clientMessage: "error"});
    }
};


///////////////////////////////////////////////////////////////////

// GET ALL THE USERS ONE TIME

exports.getOne = async(req, res) =>{
    try {
        // find all attack numbers
        // incidents has the data of all incidents

       const oneUser = await User.findById(req.params.id);
       res.status(200).json({ found: oneUser.length, oneUser });


    } catch (error) {
        res.status(401).json({clientMessage: "error"});
    }
};

//////////////////////////////////////////////////////
// CHANGE PASSWORD PART

exports.changePassword = async (req, res) => {
    try {
        
        //1. find the user from DB
        const userInfo = await User.findOne({ email: req.userInfo })
        if (!userInfo) {
            return res.status(200).json({ clientMessage: "user not found" });
        }

        //2. oldpassword === hashed password inside db

        const compare = await bcrypt.compare(req.body.oldPassword, userInfo.password);
     console.log(compare)
        if (compare === false) {
            return res.status(400).json({ clientMessage: "your old password is wrong" });
        }


        //3. newPassword > 7 characters
      
        if (req.body.newPassword.length < 7) {
            return res.status(400).json({ clientMessage: "your password is less than seven" });
        }
        //4. newPassword == oldpassword

        const newCompare = await bcrypt.compare(req.body.newPassword, userInfo.password);
        if (newCompare == true) {
            return res.status(400).json({ clientMessage: "oldpassword match hash password" });
        }


        //5. newPassword !== confirm password  
        if (req.body.newPassword !== req.body.confirmPassword) {
            return res.status(200).json({ clientMessage: "password does not match" });
        }

        const encryptPassword = await bcrypt.hash(req.body.newPassword, 10);

        await User.findOneAndUpdate({email: userInfo.email}, {password:encryptPassword});

        res.status(200).json({clientMessage: "Password Changed"});
    } catch (error) {
        console.log(error.clientMessage);
        res.status(400).json({ clientMessage: "error occured" });

    }

};



//////////////////////////////////////////////////////////////////////////////////////////////////
// CHANGING NAME

exports.changeEmail = async (req,res) =>{
    try {

        // find the Email from database

        const userInfo = await User.findOne({ email: req.body.email })
        if (!userInfo) {
            return res.status(200).json({ clientMessage: "email not found" });
        }

        // Checking Same Email

        if (userInfo.email === req.body.email){
            return res.status(400).json({clientMessage: "Same Email"})
        }

        // Updating the Email
        await User.findOneAndUpdate(userInfo.email, req.body.email);
        res.status(200).json({clientMessage: "Email is Changed"});
    } catch (error) {
        res.status(400).json({clientMessage: "error email"});
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////
exports.protect = (req,res, next ) => {
    try {
       
    const token= req.headers.authentication
    console.log(token);
    // 1. token is empty
    if (!token){
        return res.status(401).message({clientMessage: "you are not logged in"});
    
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

