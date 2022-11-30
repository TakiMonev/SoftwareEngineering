const { Router } = require('express');
const mongoose = require("mongoose");
const { Cust } = require('../models/Customer');

const http = require('http');
const fs = require('fs'); 
var path = require('path');

const express = require('express');
const customerRouter = express.Router();

const ejs = require('ejs');
var app = express();

customerRouter.use(express.json())
customerRouter.use(express.urlencoded({extended:false}));

customerRouter.use(express.static(__dirname));

customerRouter.get('/customer/:userid', async(req, res) => {
    let { userid } = req.params.userid;
    const custFound = await Cust.find({ cusId: userid });
    console.log("custFound : " + custFound);
});

/*

customerRouter.post('/post', async(req, res) => {
    try {
        console.log("posting information");
        console.log(req.body);

        let { plNo, pNo, pName, cNo, cName } = req.body;

        if (!plNo || !pNo || !pName || !cNo || !cName)
            return res.status(400).send({ err: "All informations are required" });

        // 데이터베이스에 저장
        const Customer = new Cust(req.body);
        await Customer.save();
        
        return res.send({ Customer });
          
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});
*/

module.exports = {
    customerRouter
}