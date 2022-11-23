const { Router } = require('express');
const mongoose = require("mongoose");
//const { Post } = require('../models/Post');

const http = require('http');
const fs = require('fs'); 
var path = require('path');

//const dirPath = path.join(__dirname, '../web');
const express = require('express');
const customerRouter = express.Router();

const ejs = require('ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

customerRouter.get('/customer', async(req, res) => {
    try {
        const customer = await Customer.find({});
        return res.send({ customer });
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

customerRouter.get('/customer/:customerName', async(req, res) => {
    try {
        const { cusName } = req.params;

        let getFacility = await Facility.findOne({ cusName: customerName });

        // 220609 업데이트
        if (getFacility)
        {   
            let updateBody = {};
            updateBody.fac_clicked = clicked;

            getFacility = await Facility.findOneAndUpdate({ fac_ceo: ceoName, fac_title: facilityName }, { fac_clicked: clicked }, { new: true });

            const users = await Users.find({});
            const facility = await Facility.find({});
            const themes = await Themes.find({});
            return res.render(path.join(dirPath, '/index_info.ejs'), {
                AllFac: facility,
                AllUsers: users,
                AllThemes: themes
            });
        }
        else
            res.send("Facility not found");

    } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
})

customerRouter.post('/customer', async (req, res) => {
    try {
        console.log("posting information");
        console.log("req.body" + stringfy(req.body));
        let { cusNo, cusName, cusTel, cusAddr } = req.body;

        if (!cusNo || !cusName || !cusTel || !cusAddr)
            return res.status(400).send({ err: "All informations are required" });

        // 데이터베이스에 저장
        const customer = new Customer(req.body);
        await customer.save();
        
        return res.send({ customer });

        
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

module.exports = {
    facilityRouter
}