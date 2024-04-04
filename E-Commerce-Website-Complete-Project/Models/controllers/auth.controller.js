/**
 * i need to write the controller / Logic to register a user
 */
const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")
const jwt=require("jsonwebtoken")
const secret=require("../configs/auth.config")

exports.signup= async (req,res) =>{ // signup:- create/register a user which is available throughout the module 
    /**
     * Logic to create the user
     */
    //1.Read the requsest body
  const request_body=  req.body //req.body :- this will give me request body in form of JS Object
    
    //2.Insert the data in the Users collection in MongoDB
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        userType:request_body.userType,
        password:bcrypt.hashSync(request_body.password,8)


    }
    

    try{
        const user_created=await user_model.create(userObj)

        /**
         * Return this user
         */

        //Password nhi aana chahiye
        const res_obj={
            name:user_created.name,
            userId:user_created.userId,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
        }
         res.status(201).send(res_obj) // 201-successfully created 
    }catch(err){
        console.log("Error while registering the user",err)
         res.status(501).send({ // 501 - internal server error
              meassage : "Some error happened while registering the user"
         }) 
           
    }
    //3.Return the response back to the server
    
}

 ///////SignIn
exports.signin=async(req,res)=>{
    
    //Check if the user id is present in the system
      const user =await user_model.findOne({userId:req.body.userId})

      if(user==null){
        return res.status(400).send({
            message:"user id passed is not a vallid user id"
        })
      }

    //Is Password is correct?
     const isPasswordVallid = bcrypt.compareSync(req.body.password,user.password )
     if(!isPasswordVallid){
       return res.status(401).send({
            message:"Wrong password passed"
        })
     }
     
     //Using JWT , we will create the access Token with a givan TTL & return
     const token=jwt.sign({
        id:user.userId},
        secret.secret,
        {expiresIn:120   //120:- in second
    })
     res.status(200).send({
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        accessToken:token
     })
}