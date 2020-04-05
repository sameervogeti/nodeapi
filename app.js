const express=require("express")
const mongoose=require("mongoose")
const router=require("./routes/post")
const morgan=require("morgan")
const dotenv=require("dotenv")
const bodyParser=require('body-parser')
const expressValidator=require('express-validator')
dotenv.config()

//DB
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Successfully connected to MongoDB")
})

mongoose.connection.on("error",err=> console.log(`DB Connection error:${err.message}`))
const app=express()

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())
app.use("/",router)


const port=process.env.PORT ||8080


app.listen(port,()=>{
    console.log(`Express JS Port is listening on ${port}`)

})