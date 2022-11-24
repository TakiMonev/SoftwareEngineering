const { Router } = require('express');
const mongoose = require("mongoose");
const { Cust } = require('../models/Customer');
const { Customer } = require('../classes/custClass')

const http = require('http');
const fs = require('fs'); 
var path = require('path');

const express = require('express');
const mainRouter = express.Router();

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
        cusInfo.Insert(cusNo, cusName, cusTel, cusAddr);
        //await customer.save();
        
        return res.send({ customer });
          
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

mainRouter.post('/delete', async(req, res) => {
    try {
        const cusBody = new Cust(req.body);
        const cust = new Customer();
        const ret = cust.Delete(cusBody.cusNo);
        
        if (ret == null) {
            return res.status(500).send({ err: err.message })
        }

        return res.send(ret);
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

mainRouter.post('/update', async(req, res) => {
    try {
        //const Body = new Cust({ cusNo: req.body.before });
        const newClass = new Customer();
        const ret = newClass.Update(req.body.before, req.body.after);

        if (ret == null) {
            return res.send({ err: err.message })
        }
        
        return res.send(ret);
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = {
    mainRouter
}