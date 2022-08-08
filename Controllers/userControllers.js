exports.signUp = (req, res)=>{
try {
    // check if email exist
    
} catch (e) {
    res.status(401).json({message:"error signup"})
}
}