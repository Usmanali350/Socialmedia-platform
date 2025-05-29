require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const connecttoDB = require('./DBconnection'); 

const app = express();
app.use(express.json());
app.use(cors()); 


connecttoDB();
const port = process.env.port || 1177;
app.listen(port, () => {
    console.log(`🏐 server is running on port ${port}`);
});
