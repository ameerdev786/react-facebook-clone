const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    sku:{
        type:String,
        required:true,
        unique:true
    },
    quantity:{
        type:String,
        required:true
    }
    ,
    price:{
        type:String,
        required:true
    },
    description:{
        required:true,
        trim:true,
        type:String
    },
    offer:{
        type:Number
    },
    productPicture:[
        
            {img:{type:String}}
    ],
    reviews:[
        {
       userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        review:String 
        }
    ],
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category",required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    updateAt:Date
    
},{timestamps:true});

module.exports=mongoose.model('Product',productSchema)
