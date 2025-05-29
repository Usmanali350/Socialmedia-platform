const express=require('express')
const bcrypt=require('bcryptjs')
const User=require('../Model/User')
const router=express.Router();


router.post('/',async(req,res)=>{
    const {name,email,password}=req.body;
  try{
const existingUser=await User.findOne({email});
if(existingUser)return res.status(400).json({message:'You are already axists'});
const hashedPassword=await bcrypt.hash(password,10);
const newUser=new User({name,email,password,hashedPassword})
await newUser.save();
res.status(200).json({message:'user registered successfully'})
  }catch(err){
res.status(500).json({message:'server error', err:error.message})
  }
})
module.exports=router;