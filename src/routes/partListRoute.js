const { Router } = require('express');
const mongoose = require("mongoose");
const { Empl } = require('../models/Employ');
const { Employ } = require('../classes/emplClass')

const http = require('http');
const fs = require('fs'); 
var path = require('path');

const express = require('express');
const partListRouter = express.Router();

const ejs = require('ejs');
var app = express();

partListRouter.use(express.json())
partListRouter.use(express.urlencoded({extended:false}));

partListRouter.use(express.static(__dirname));

partListRouter.post('/post', async(req, res) => {
    try {
        console.log("posting information");
        console.log(req.body);

        let { worNo, worId, worPwd, worName, worTel, worPosition } = req.body;

        if (!worNo || !worId || !worPwd || !worName || !worTel || !worPosition)
            return res.status(400).send({ err: "All informations are required" });

        // 데이터베이스에 저장
        const worker = new Empl(req.body);
        await worker.save();
        
        return res.send({ worker });
          
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = {
    partListRouter
}