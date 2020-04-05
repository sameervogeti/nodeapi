const mongoose =require("mongoose")
const uuidv1=require("uuid/v1")
const crypto = require('crypto');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    hashed_password:{
        type:String
    },
    salt:String,
    created:{
        type:Date,
        default:Date.now()
    },
    updated:Date
});

//virtual field

userSchema.virtual('password').set(function(password){
    this._password=password
    this.salt=uuidv1()
    //encrypt password
    this.hashed_password=this.encryptPassword(password)

}).get(function(){
    return this._password;
})

userSchema.methods={
    encryptPassword:function(password){
        if(!password) return ""

        try{
            const hash = crypto.createHmac('sha256', this.salt)
                   .update(password)
                   .digest('hex');
        console.log(hash);
            return hash
        }catch(err)
        {
            return ""
        }

    }
}

module.exports=mongoose.model("User",userSchema)