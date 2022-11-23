const { Router } = require('express');
//const facilityRouter = Router();      //mainRouter로 대체
const mongoose = require("mongoose");
const { Cust } = require('../models/Customer');
const { Customer } = require('../classes/custClass')

const http = require('http');
const fs = require('fs'); 
var path = require('path');

const dirPath = path.join(__dirname, '../web');
const express = require('express');
const mainRouter = express.Router();

const custClass = require('../classes/custClass');

const ejs = require('ejs');
var app = express();

mainRouter.use(express.json())
mainRouter.use(express.urlencoded({extended:false}));

mainRouter.use(express.static(__dirname));

mainRouter.get('/', async (req, res) => {
    try {
        res.sendFile(__dirname + '/test.html');
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

mainRouter.get('/login', async (req, res) => {
    try {
        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

mainRouter.post('/', async(req, res) => {
    try {
        console.log("posting information");
        console.log(req.body);

        let { cusNo, cusName, cusTel, cusAddr } = req.body;

        if (!cusNo || !cusName || !cusTel || !cusAddr)
            return res.status(400).send({ err: "All informations are required" });

        // 데이터베이스에 저장
        const customer = new Cust(req.body);
        const cusInfo = new Customer();
        cusInfo.insert(cusNo, cusName, cusTel, cusAddr);
        //await customer.save();
        
        return res.send({ customer });
          
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

module.exports = {
    mainRouter
}