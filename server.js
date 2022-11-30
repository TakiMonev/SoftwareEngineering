const express = require('express');
const app = express();
const { mainRouter } = require('./src/routes/mainRoute');
const mongoose = require('mongoose');

const ejs = require('ejs');
const http = require('http');
const fs = require('fs'); 
const path = require('path');
const multer = require('multer');
var cookieParser = require('cookie-parser');
const { loginRouter } = require('./src/routes/loginRoute');
const { employRouter } = require('./src/routes/employRoute');
const { partRouter } = require('./src/routes/partRoute');
const { partListRouter } = require('./src/routes/partListRoute');

app.set('view engine', 'ejs');

// const users = [];
// const all_users = [];

//const MONGO_URI = 'mongodb+srv://SangYoun:2UzOAzhnCrG9fDgU@cluster0.ifrg3q4.mongodb.net/test';

const server = async() => {
    try {
        const { MONGO_URI, PORT } = process.env;
        if (!MONGO_URI) console.log("MONGO_URI is required!!!");
        if (!PORT) throw new Error("PORT is requrired");

        console.log("Entered into the server...");

        await mongoose.connect(MONGO_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology:true, 
        });
        console.log('MongDB connected!!!')
        // 미들웨어
        app.use(express.json());
        app.use('/', loginRouter);
        app.use('/main', mainRouter);
        app.use('/employ', employRouter);
        app.use('/items', partRouter);
        app.use('/itemList', partListRouter);
        app.use(cookieParser());
        //app.use('/customer', custRouter);
       
        // 받는 곳
        app.listen(PORT, async () =>  console.log(`server listening on port ${PORT}`))
    } catch(err) {
        console.log(err);
    }
}

server();