const mongoose=require('mongoose')
const userScema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
    trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }, 
        timestamps:true
    
})
const User=mongoose.model('User',userScema)
module.exports=User