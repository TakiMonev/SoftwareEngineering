const { Router } = require('express');
const mongoose = require("mongoose");
const { Cust } = require('../models/Customer');
const { Customer } = require('../classes/custClass');

const http = require('http');
const fs = require('fs'); 
var path = require('path');

const express = require('express');
const loginRouter = express.Router();

const ejs = require('ejs');
var cors = require('cors');
const { isEmptyObject } = require('document/lib/lang');
const { default: axios } = require('axios');

loginRouter.use(cors());

loginRouter.use(express.json())
loginRouter.use(express.urlencoded({extended:false}));

//loginRouter.use(express.static(__dirname));
loginRouter.use(express.static(path.join(__dirname, '../../sw-engineering/public/index')));

loginRouter.get('/', async (req, res) => {
    try {
        res.send(path.join(__dirname,  '../../sw-engineering/src/public/index'));
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

loginRouter.post('/signup', async(req, res) => {
    try {
        console.log("posting information");
        console.log(req.body);
        
        let { cusNo, cusId, cusPwd, cusName, cusTel } = req.body;

        if (!cusNo || !cusId || !cusPwd || !cusName || !cusTel)
            return res.status(400).send({ err: "All informations are required" });

        // 데이터베이스에 저장
        const customer = new Cust(req.body);
        const cusInfo = new Customer();
        //cusInfo.Insert(cusNo, cusId, cusPwd, cusName, cusTel);
        await customer.save();
        
        return res.send({ customer });
          
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

loginRouter.post('/login', async(req, res) => {
    try {
        //console.log("posting information");
        //console.log(req.body);

        const tmpId = await Cust.find({ cusId : req.body.cusId });
        console.log(isEmptyObject(tmpId));
        
        if (isEmptyObject(tmpId))
            console.log("로그인 실패. 아이디 / 비번 확인");

        else
        {
            return res.status(200).send('Complete');
        }

    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

loginRouter.post('/find', async (req, res) => {
    try {
        let { CusNo } = req.body;

        const foundCust = Cust.findOne({ cusNo: CusNo });
        console.log(foundCust);

        if (!foundCust) {
            window.alert("Cannot find" + foundCust);
            res.send(path.join(__dirname, '../../sw-engineering/src/pages/auth-page/LoginPage'))
        }

    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

loginRouter.post('/delete', async(req, res) => {
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

loginRouter.post('/update', async(req, res) => {
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
    loginRouter
}