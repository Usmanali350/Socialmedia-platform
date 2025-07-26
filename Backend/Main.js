require('dotenv').config();
const express = require('express');
const connecttoDB = require('./DBconnection');
const cors = require('cors');
const UserRoute = require('./Routes/UserRoute');

const app = express();


app.use(express.json());
app.use(cors());

connecttoDB();
const port = process.env.port || 1177;
app.listen(port, () => {
    console.log(`🏐 server is running on port ${port}`);
});
