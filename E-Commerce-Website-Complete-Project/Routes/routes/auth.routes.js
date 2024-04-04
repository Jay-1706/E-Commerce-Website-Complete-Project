/**
 * POST localhost:2807/ecomm/api/v1/auth/signup
 * 
 * I need to Intercept this
 */
const authController=require("../controllers/auth.controller")
const auth_mw=require("../middlewares/auth.mw")


module.exports =(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[auth_mw.verifySignUpBody],authController.signup)


/**
 * Route for POST https://lemon-analyst-pxldb.pwskills.app:8888/ecomm/api/v1/auth/signup
 */
app.post("/ecomm/api/v1/auth/signin",auth_mw.verifySignInBody,authController.signin)

}