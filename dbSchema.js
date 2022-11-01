const mongoose=require("mongoose")
const validator=require("validator")
 var userSchema=new mongoose.Schema({
    firstName:{type:"string",required:true},
    lastName:{type:"string",required:true},
    email:{
        type:"string",
        required:true,
        lowercase:true,
        validate:(value)=>{
            return validator.isEmail(value)
        }
    },
    password:{type:"string",required:true},
    role:{type:"string",default:"user"},
    createdAt:{type:Date,default:Date.now()}
 })

 let usersModel=mongoose.model("users",userSchema)
 module.exports={mongoose,usersModel}