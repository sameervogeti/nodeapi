const express=require("express")
const {signup,signin,signout}=require("../controllers/auth")
const validator=require("../validator/validator")

const router=express.Router()

router.post("/signup",validator.userSignupValidator,signup)
router.post("/signin",signin)
router.get("/signout",signout)

module.exports=router;