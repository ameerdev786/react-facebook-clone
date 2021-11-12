const express=require('express');
const router= express.Router();
const { requireSignin,adminMiddleaware} = require('../common-middleware');
const {createProduct,deleteProductById}=require('../controller/product');
const shortId=require('shortid');
const path=require('path');
const multer=require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),"uploads"))
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + '-' + file.originalname)
    }
  })

  const upload=multer({storage})

  

router.post('/product/create',requireSignin,adminMiddleaware,upload.array('productPicture'),createProduct)
router.delete( "/product/deleteProductById",requireSignin, adminMiddleaware, deleteProductById);
module.exports=router;