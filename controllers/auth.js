const jwt=require("jsonwebtoken")
const expressjwt=require("express-jwt")
require('dotenv').config()
const User = require("../models/user")

exports.signup=async (req,res)=>{
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) return res.status(403).json({
        error:"Email Address is already Taken"
    })

    const user=await new User(req.body)
    await user.save()
    return res.status(200).json({message:"Signup successful.Please login!"})
},

exports.signin=async (req,res)=>
{
const {email,password}=req.body
    User.findOne({email},(err,user)=>
        {
            if(err || !user)
            {
                return res.status(401).json({error:"User doesn't exist with the given mail Id.Please signup with the same"})
            }
            if(!user.authenticated(password))
            {
                return res.status(401).json({error:"Email and password don't match"})

            }
            const token=jwt.sign({_id:user._id},process.env.JWT_SECRET)
            res.cookie("t",token,{expire:new Date()+9999})
            const{_id,name,email}=user
            return res.json({token,user:{_id,name,email}})
        }

    )
},
exports.signout=async(req,res)=>
{
    res.clearCookie("t")
    return res.json({message:"Signout successful"})
},
exports.requireSignIn=expressjwt({
    secret:process.env.JWT_SECRET,
    userProperty:"auth"
})