const User = require("../Models/userModel");
exports.userSignUp = async(req, res)=>{
try {
    // check if email exist
    const userInfo = await User.create(req.body) 

    if (userInfo){
        return res.status(401).json({message: "email already exist"})
        res.status(200).json({message: "success"});
        
    }

    // check email password === confirm password
    if (!userInfo.password === req.body.confirmPassword){
        return res.status(401).json({message: "password does not match"});
    }


} catch (e) {
    res.status(401).json({message:"error signup"})
}
}

