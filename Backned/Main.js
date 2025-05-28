require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const connecttoDB = require('./DBconnection'); // ✅ Import the function

const app = express();
app.use(express.json());
app.use(cors()); // Optional but common

// ✅ Call the function to connect to MongoDB
connecttoDB();

const port = process.env.port || 1177;
app.listen(port, () => {
    console.log(`🏐 server is running on port ${port}`);
});
