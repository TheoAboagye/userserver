import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import FirstModel from "./todoSchema/todoshema.js"

const port=process.env.PORT || 3000
const app=express()


app.use(cors())
app.use(express.json())
dotenv.config()

const url=process.env.DB_URL

mongoose.connect(url,{
    useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log("database connected successfully")}
).catch((error)=>{
    console.log(error)
})


app.get('/',(req,res)=>{
    res.send("My User Details API")
});

app.get('/getAllUsers',async(req,res)=>{
const details=await FirstModel.find({});
if(details){
    return res.status(200).json({
        message:"users details available",
        data:details
    })
}else{
    return res.status(400).json({
        message:"error in fetching users details"
    })
}
})

app.post('/addNewUser',async(req,res)=>{
    const {first_name,last_name,date_of_birth,school}=req.body
    const details=await FirstModel.create({
        first_name,
        last_name,
        date_of_birth,
        school
    });
    if(details){
        return res.status(200).json({
            message:"User has been created",
            data:details
        })
    }else{
        return res.status(400).json({
            message:"Failed to create user details"
        })
    }
})

app.listen(port,()=>{
    console.log(`the server is running at ${port}`)}
)