// importing connection to dotenv file
require('dotenv').config();

// imports
const express = require('express');
const connectToDB = require('./database/db.js');
const authRouter = require('./routes/auth-routes.js');
const homeRouter = require('./routes/home-route.js');
const adminRouter = require('./routes/admin-routes.js');


// creating server
const app = express();
const PORT = process.env.PORT || 3000;

// connecting to database
connectToDB();

// creating middleware to produce json and access req.body
app.use(express.json());

// routes
app.use('/api/auth', authRouter);
app.use('/api/home', homeRouter);
app.use('/api/adminpage/', adminRouter);


// listening to port
app.listen(PORT, () => {
    console.log(" \n Server listening to port : ", PORT);
    
});