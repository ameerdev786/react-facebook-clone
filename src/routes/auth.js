const express = require("express");
const router = express.Router();
const {signup,signin} = require("../controller/auth");
const {  giveErrorMsg, validateSignUpRequest, validateSignInRequest } = require("../validator/auth");

router.post("/signup",validateSignUpRequest,giveErrorMsg, signup);
router.post("/signin",validateSignInRequest,giveErrorMsg, signin);

// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({user:"ok the report "})
// })
module.exports = router;
