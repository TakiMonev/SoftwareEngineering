const { Router } = require('express');
const mongoose = require("mongoose");
const { Emp } = require('../models/Employ');
const { Employ } = require('../classes/emplClass')

const http = require('http');
const fs = require('fs'); 
var path = require('path');

const express = require('express');
const employRouter = express.Router();

const ejs = require('ejs');
var app = express();

employRouter.use(express.json())
employRouter.use(express.urlencoded({extended:false}));

employRouter.use(express.static(__dirname));

employRouter.get('/', async (req, res) => {
    try {
        res.sendFile(__dirname + '/test.html');
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

employRouter.post('/', async(req, res) => {
    try {
        console.log("posting information");
        console.log(req.body);

        let { worNo, worId, worPwd, worName, worTel, worAddr, worPosition } = req.body;

        if (!worNo || !worId || !worPwd || !worName || !worTel || !worAddr || !worPosition)
            return res.status(400).send({ err: "All informations are required" });

        // 데이터베이스에 저장
        const worker = new Emp(req.body);
        const worInfo = new Employ();
        worInfo.Insert(worNo, worId, worPwd, worName, worTel, worAddr, worPosition);
        //await customer.save();
        
        return res.send({ worker });
          
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

employRouter.post('/delete', async(req, res) => {
    try {
        const empBody = new Emp(req.body);
        const emp = new Employ();
        const ret = emp.Delete(empBody.worNo);
        
        if (ret == null) {
            return res.status(500).send({ err: err.message })
        }

        return res.send(ret);
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

employRouter.post('/update', async(req, res) => {
    try {
        //const Body = new Cust({ cusNo: req.body.before });
        const newClass = new Employ();
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
    employRouter
}