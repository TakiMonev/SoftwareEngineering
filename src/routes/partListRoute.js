const { Router } = require('express');
const mongoose = require("mongoose");
const { Pali } = require('../models/PartList');

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

partListRouter.get('/', async(req, res) => {
    const partFound = await Pali.find({});
    console.log("partFound : " + partFound);
});

partListRouter.post('/post', async(req, res) => {
    try {
        console.log("posting information");
        console.log(req.body);

        let { plNo, pNo, pName, cNo, cName } = req.body;

        if (!plNo || !pNo || !pName || !cNo || !cName)
            return res.status(400).send({ err: "All informations are required" });

        // 데이터베이스에 저장
        const PartList = new Pali(req.body);
        await PartList.save();
        
        return res.send({ PartList });
          
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = {
    partListRouter
}