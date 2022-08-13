const User = require("../Models/userModel");
const bcrypt = require('bcrypt');



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

    // check if email password === confirm password
    if (req.body.password !== req.body.confirmPassword){
        return res.status(401).json({clientMessage: "password does not match"});
    }


    // encrypt the password

   const encryptPassword =  await  bcrypt.hash(req.body.password, 10)
   req.body.password = encryptPassword;

//    // create new user
   await User.create(req.body);
   res.status(200).json({clientMessage: "user is created"});



} catch (e) {
    res.status(401).json({clientMessage:"error signup"})
}
};


/////////////////////////////////////////////////////////////////////////
// LOGIN PART


exports.login = async(req, res) => {
    try {
        // checking if user already exist in the database
        const myUser = await User.findOne({email: req.body.password});
        
        // if user not found send your not found
        if (!myUser){
            return res.status(401).json({clientMessage: "user to found"});
        }

        // comparing the database password and login password
       const comparePassword = await bcrypt.compare(req.body.password, myUser.password)

       // if both password does not match
       if (!comparePassword){
        return res.status(401).json({clientMessage: "Email or Password is incorrect"});
       
       }

       // send success login message
       res.status(200).json({clientMessage: "loggin success"});


    } catch (e) {
      res.status(400).json({clientMessage: "error"});
    }
}
