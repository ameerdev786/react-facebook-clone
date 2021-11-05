const User = require("../model/user");
const jwt=require('jsonwebtoken');
 const bcrypt= require("bcrypt")
 require('dotenv').config();
 
exports.signup=(req,res)=>{

    User.findOne({ email: req.body.email }).exec(async(error, user) => {
        if (user) return res.status(400).json({ message: "user  already exist" });
        const {firstName,lastName,email,password}=req.body;
        const hash_password=await bcrypt.hash(password,10)
        const _user=new User({
            firstName,
            lastName,
            email,
            hash_password,
            userName:Math.random().toString()
        })
        _user.save((error,data)=>{
            if(error){
                return res.status(400).json({ message:error})
            }
            if(data){
                return res.status(201).json({ message:"user created sucessfully ..!"})
            }
        })
        
      });
}

exports.signin=(req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(error) return res.status(400).json({error});
        if(user){
          if(user.authenticate(req.body.password)){
                const token=jwt.sign({_id:user._id,role:user.role},'mysecret')
                const {firstName,_id,lastName,role,email,fullName}=user;
                        res.status(200).json({
                            token,
                            user:{
                               _id, firstName,lastName,email,fullName,role
                            }
                        })
          }
          else{
              res.status(400).json({message:"invalid password"})
          }
        }
        else{
            res.status(400).json({message:"something went wrong"})
        }
    })
}

