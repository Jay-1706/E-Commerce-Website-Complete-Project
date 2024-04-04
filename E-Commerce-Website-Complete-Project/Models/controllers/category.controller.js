const category_model = require("../models/category.model")


/**
 -* Controller for creating the category:-Likes:=
 * 
 * POST localhost:8888/ecomm/api/v1/categories
 * 
 * {
 *   "name":"Household",
 *   "description": "This will have all the household items"
 * }
 */

exports.createNewCategory=async(req,res)=>{
    //Read the req body
    
    //create the category
    const cat_data={
        name:req.body.name,
        description : req.body.description
    }

    try{  
          //Insert the mongodb
    const category=await category_model.create(cat_data)
    return res.status(201).send(category)
    }catch(err){
       console.log("ERROR WHILE CREATING THE CATEGORY",err) 
       return res.status(500).send({
        message:"Error while creating the category"
       })    
    }

    //return the response of tge created category
}
