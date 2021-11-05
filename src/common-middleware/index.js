const jwt=require('jsonwebtoken')

exports.requireSignin=(req,res,next)=>{

  if(req.headers.authorization){
    const token=req.headers.authorization.split(" ")[1];
    const user=jwt.verify(token,"mysecret");
    req.user=user;
  }else{
    return res.status(400).json({message:"Authorization is required"})
  }
  next()
}
exports.userMiddleWare=(req,res,next)=>{
  if(req.user.role !== 'user'){
    return res.status(400).json({message:"user acess Denied"})
  }
  next()

}

exports.adminMiddleaware=(req,res,next)=>{
  if(req.user.role !== 'admin'){
    return res.status(400).json({message:"admin acces Denied"})
  }
  next()
}