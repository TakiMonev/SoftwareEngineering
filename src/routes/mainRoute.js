const { Router } = require('express');
const mongoose = require("mongoose");
const { Cust } = require('../models/Customer');
const { Customer } = require('../classes/custClass')

const http = require('http');
const fs = require('fs'); 
var path = require('path');

const express = require('express');
const mainRouter = express.Router();

//const ejs = require('ejs');
var cors = require('cors');
mainRouter.use(cors());

mainRouter.use(express.json())
mainRouter.use(express.urlencoded({extended:false}));

//mainRouter.use(express.static(__dirname));

mainRouter.get('/main', async (req, res) => {
    try {
        res.send(path.join(__dirname,  '../../sw-engineering/public/index'));
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

mainRouter.post('/main', async(req, res) => {
    try {
        console.log(req.body);

        let { cusAddr, cusNo } = req.body;

        if (!cusNo ||!cusAddr)
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
});

mainRouter.post('/main', async(req, res) => {
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
});

mainRouter.post('/main/delete', async(req, res) => {
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

mainRouter.post('/main/update', async(req, res) => {
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


/*

loginRouter.post('/login', async(req, res) => {
    try {
        console.log("posting information");
        console.log(req.body);

        let { cusId, cusPwd } = req.body;

        if (!cusId || !cusPwd)
            return res.status(400).send({ err: "All informations are required" });

        // 데이터베이스에 저장
        const customer = new Cust(req.body);
        const cusInfo = new Customer();
        cusInfo.Insert(cusNo, cusId, cusPwd, cusName, cusTel);
        //await customer.save();
        
        return res.send({ customer });
          
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

*/
module.exports = {
    mainRouter
}