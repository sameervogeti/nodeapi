const User=require("../models/user")

exports.userById=(req,res,next,id)=>{
    User.findById(id).exec(
        (err,user)=> {
            if(err||!user)
{
    return res.status(400).json(
        {error:"User Not Found"}
        )
}
            req.profile=user
            next()
        }
    )
}

exports.hasAuthorization=(req,res,next)=>{
    const authorized=req.profile && req.auth && req.profile._id === req.auth._id

    if(!authorized)
    {
        res.status(403).json({error:"User is Not authorized to perform this action"})
    }
    

}