const express = require('express');
const app = express();
const { mainRouter } = require('./routes/mainRoute');

const mongoose = require('mongoose');

const ejs = require('ejs');
const http = require('http');
const fs = require('fs'); 
const path = require('path');
const multer = require('multer');

app.set('view engine', 'ejs');

const server = async() => {
    try {
        const { MONGO_URI, PORT } = process.env;
        if (!MONGO_URI) console.err("MONGO_URI is required!!!");
        if (!PORT) throw new Error("PORT is requrired");

        console.log("Entered into the server...");

        await mongoose.connect(MONGO_URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology:true, 
        //    useCreateIndex:true, 
        //    useFindAndModify: false 
        });
        console.log('MongDB connected!!!')
        // 미들웨어
        app.use(express.json());
        app.use('/', mainRouter);
        app.use('/login', mainRouter);
        app.use('/reserved', mainRouter)
    
        // 받는 곳
        app.listen(PORT, async () =>  console.log(`server listening on port ${PORT}`))
    } catch(err) {
        console.log(err);
    }
}

server();