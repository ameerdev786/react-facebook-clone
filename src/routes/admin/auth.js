const express = require("express");
const { requireSignin } = require("../../common-middleware");
const router = express.Router();
const {signup,signin,signout} = require("../../controller/admin/auth");
const {  giveErrorMsg, validateSignUpRequest, validateSignInRequest } = require("../../validator/auth");

router.post("/admin/signup",validateSignUpRequest,giveErrorMsg, signup);
router.post("/admin/signin",validateSignInRequest,giveErrorMsg, signin);
router.post("/admin/signout",requireSignin, signout);


module.exports = router;
