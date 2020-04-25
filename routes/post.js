const express=require("express")
const {getPosts,createPost}=require("../controllers/post")
const {requireSignIn}=require("../controllers/auth")
const validator=require("../validator/validator")

const router=express.Router()

router.get("/",requireSignIn,getPosts)
router.post("/post",validator.createPostValidator,createPost)

module.exports=router;
