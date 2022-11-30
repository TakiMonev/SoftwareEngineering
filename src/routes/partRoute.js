const { Router } = require('express');
const mongoose = require("mongoose");
const { Part } = require('../models/Part');
const { Employ } = require('../classes/emplClass')

const http = require('http');
const fs = require('fs'); 
var path = require('path');

const express = require('express');
const partRouter = express.Router();

const ejs = require('ejs');
var app = express();

partRouter.use(express.json())
partRouter.use(express.urlencoded({extended:false}));

partRouter.use(express.static(__dirname));

partRouter.post('/post', async(req, res) => {
    try {
        console.log("posting information");
        console.log(req.body);

        let { pNo, pName, pPrice } = req.body;

        if (!pNo || !pName || !pPrice)
            return res.status(400).send({ err: "All informations are required" });

        // 데이터베이스에 저장
        const part = new Part(req.body);
        await part.save();
        
        return res.send({ part });
          
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = {
    partRouter
}