const Product=require('../model/product');

const slugify=require('slugify')

exports.createProduct=(req,res)=>{

    const {name,price,description,category,createdBy,quantity}=req.body;

    let productPicture=[];
    if(req.files.length > 0){
        productPicture=req.files.map(file=>{
            return {img:file.filename}
        }
        )
    }

    const  product= new Product({
        category,
        productPicture,
        price,
        name:name,
        sku:slugify(name),
        description,
        createdBy:req.user._id,
        quantity
    });

    product.save(((error,product)=>{
        if(error) return res.status(400).json({error})
        if(product) {
            res.status(201).json({product})
       }
   }))
    // res.status(200).json({file:req.files,body:req.body}) 
 
 }