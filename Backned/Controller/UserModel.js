const UserModel=require("../Controller/UserModel")
const bcrypt=require('bcrypt');
const User = require("../Scemas/User");
//For register all user
exports.registerController=async(req,res)=>{
try{
const {username, email, password}=req.body;
if(!username || !email || !password){
    return res.status(400).send({

success:'false',
message:'Plese fill all fields corrrectly'})
    }

const existingUser=await User.findOne({email});
if(existingUser){
    return res.status(401)({
success:'flase',
message:'User are already exist'})
    }
const hashedPassword=await bcrypt.hash(password,15)
const user = User ({username,email,password:hashedPassword})
await user.save()
return res.status(201).send({
    success:true,
    message:'New user are created'
})
}catch(error){
console.log(error.message||error)
return res.status(500).send({
    success:false,
    message:'error in registration',
    error
});
}
};

// getting all users
exports.getUserController=async(req,res)=>{
try{
const users=await User.find()
return res.status(200).send({
    usersCount:users.length,
    success:true,
    message:'All users data given',
    users
})
}catch(error){
console.log(error.message|| error)
return res.status(500).send({
    success:false,
    message:'Error in fetching all user data',
    error
})
}
};

//Login user
exports.loginUser=async (req,res)=>{
    try{
    const {email,password}=req.body;
    if(!email && !password){
        return res.status(400).send({
    success:false,
message:'email is requireed  OR passowrd is required'});
const user=await User.find({email })
        }
if(!user){
    return res.status(404).send({
success:false,
message:'invalid email or password'
    });
}
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(404).send({
    success:false,
    message:'invalid email or password'
});
    }
const {password:_, ...rest}=user._doc;
return res.status(200).send({
    success:true,
    message:'user login successfully',
    user:rest
})
    }
    catch(error){
        console.log(error.message||error)
        return res.status(500).send({
            success:false,
            message:'error in logging in user',
            error
              
        })
    }
}