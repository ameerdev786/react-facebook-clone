const { check,validationResult }=require('express-validator');

exports.validateSignUpRequest=[
    check('firstName').notEmpty().withMessage('firstName is required & more than 3 char long'),
    check('lastName').notEmpty().withMessage('lastName is required & more than 3 char long'),
    check('email').isEmail().withMessage(' email  required & should valid'),
    check('password').isLength({min:6}).withMessage('password  should be more than 6 character long ')
]
exports.validateSignInRequest=[
    check('email').isEmail().withMessage(' email required & should valid'),
    check('password').isLength({min:6}).withMessage('password  should be more than 6 character long ')
]

exports.giveErrorMsg=(req,res,next)=>{
    const errors=validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({error:errors.array().map(err=>err.msg)})
    }
    next()
}