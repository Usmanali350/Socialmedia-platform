require('dotenv').config()
const mongoose=require('mongoose');
const connecttoDB=async()=>{
    try{
     const connection=await mongoose.connect(process.env.mongodburl);
     console.log(`🤣 connected to db successfully: ${connection.connection.host}`)
    }catch(error)
    {
     console.error(`DB connection error: ${error.message}`);
     process.exit(1);
    }
}
module.exports= connecttoDB;