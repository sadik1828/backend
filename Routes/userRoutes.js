const express = require("express");
const userController = require("../Controllers/userControllers");

const router = express.Router();

router.route("/signup").post(userController.userSignUp);



module.exports = router;