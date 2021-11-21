const express=require('express');
const { requireSignin, adminMiddleaware } = require('../common-middleware');
const router= express.Router();
const {addCategory,getCategories,updateCategory,deleteCategory}=require('../controller/category')
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

router.post('/category/create',requireSignin,adminMiddleaware,upload.single("categoryImage"),addCategory)
router.post('/category/update',upload.array("categoryImage"),updateCategory)
router.get('/category/getcategory',getCategories)
router.post('/category/delete',deleteCategory)
module.exports=router;
