const express=require("express")
const {signup}=require("../controllers/auth")
const validator=require("../validator/validator")

const router=express.Router()

router.post("/signup",validator.userSignupValidator,signup)

module.exports=router;