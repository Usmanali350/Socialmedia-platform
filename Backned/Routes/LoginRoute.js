const express=require('express')
const bcrypt=require('bcryptjs')
const User=require('../Model/User');
const { route } = require('./registerRoute');
const router=express.Router;

route.post('/',async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email){
           return res.status(400).send
        }

    }catch(err){
        res.status(500).json({message:'network issue'})
    }
})