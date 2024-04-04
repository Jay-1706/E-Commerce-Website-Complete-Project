/**
 * POST https://lemon-analyst-pxldb.pwskills.app:8888/ecomm/api/v1/categories
 */
category_controller=require("../controllers/category.controller")
auth_mw=require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/categories",[auth_mw.verfyToken],category_controller.createNewCategory)
}