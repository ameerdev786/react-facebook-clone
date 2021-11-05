const express=require('express');
const { requireSignin, userMiddleWare } = require('../common-middleware');
const router= express.Router();
const {addItemsToCart}=require('../controller/cart')
router.post('/user/cart/addtocart',requireSignin,userMiddleWare,addItemsToCart)
module.exports=router; 