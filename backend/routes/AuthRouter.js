const express = require("express");
const { signUpValidation, logInValidation } = require("../middleware/AuthValidation"); 
const { signUp, login } = require("../controllers/AuthController"); 

const router = express.Router();



// Signup Route
router.post("/signup", signUpValidation, signUp);
// login Route
router.post("/login", logInValidation, login);

module.exports = router;
