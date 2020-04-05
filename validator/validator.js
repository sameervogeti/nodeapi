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

exports.userSignupValidator=(req,res,next) =>{

    req.check("name","User Name should not be empty").notEmpty()
    req.check("name","User Name should be between 4 and 150 chars").isLength(
        {
            min:4,
            max:150
        })

    req.check("email","Email should not be empty").notEmpty()
    req.check("email","Email should be between 4 and 2000 chars").matches
    (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .withMessage("Email address not well formed").isLength(
        {
            min:4,
            max:2000
        })

    req.check("password","password should not be empty").notEmpty()
    req.check("password","password should be minimum 6 chars").isLength(
    {
        min:6
    })    

    const errors=req.validationErrors()

    if(errors){
        const firstError=errors.map((error)=>error.msg)[0]
        return res.status(400).json({error:firstError})
    }

    next();

}