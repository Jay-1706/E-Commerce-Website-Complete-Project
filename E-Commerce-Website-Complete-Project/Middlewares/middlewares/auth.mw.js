//For "check if the user with the same userId is alreday present", 
//we need to connect user_model
const user_model=require("../models/user.model")

const jwt=require("jsonwebtoken")
const auth_config=require("../configs/auth.config")
/**
 * create a mw will check if the body is proper and correct
 */
const verifySignUpBody=async (req,res,next)=>{
   
    try{

        //check for the name
        if(!req.body.name){
            return res.status(400).send({
                message:"Failed ! Name was not provided in request body "
            })
        }
        //check for email
        if(!req.body.email){
            return res.status(400).send({
                message:"Failed ! Email was not provided in request body "
            })
        }

        //check for userID
        if(!req.body.userId){
            return res.status(400).send({
                message:"Failed ! UserId was not provided in request body "
            })
        }

        //check if the user with the same userId is alreday present
        const user=await user_model.findOne({userId:req.body.userId})
    
         if(user){
            return res.status(400).send({
                message:"Failed ! User with same userId is already present "
            })
         }

          next()

    }catch(err){
        console.log("Error while vallidating the request body")
        res.status(500).send({
            message:"Error while vallidating the request body"
        })
    }
}

//SignIn
const verifySignInBody=async(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            message:"User Id is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            message:"Password is not provided"
        })
    }
     
    next()
}

const verifyToken=(req,res,next)=>{
    //check if the Token is present in the header
     const token=req.headers['x-access-token']

     if(!token){
        return res.status(403).send({
            message:"No token found:unauthorized"
        })
     }

    //If its a vallid token
    jwt.verify(token,auth_config.secret , async(err,decoded)=>{
    if(err){
        return res.status(401).send({
            message:"UnAuthorized"
        })
    }
    const user=await user_model.findOne({userId:decoded.id})
    if(!user){
        return res.status(401).send({
            message:"UnAuthorized , this user for this token doesn't exist"
        })
    }
    next()
    })


    //Then Move to the next step
}

module.exports={
    verifySignUpBody:verifySignUpBody,
    verifySignInBody:verifySignInBody.apply,
    verifyToken:verifyToken
}

