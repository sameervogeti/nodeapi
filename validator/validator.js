exports.createPostValidator=(req,res,next) =>{

    req.check("title","Title should not be empty").notEmpty()
    req.check("title","Title should be between 4 and 150 chars").isLength(
        {
            min:4,
            max:150
        })

    req.check("body","Body should not be empty").notEmpty()
    req.check("body","Body should be between 4 and 150000 chars").isLength(
        {
            min:4,
            max:150000
        })

    const errors=req.validationErrors()

    if(errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({error:firstError})
    }

    next();

}