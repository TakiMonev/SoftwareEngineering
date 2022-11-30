const { Router } = require('express');
const mongoose = require("mongoose");
const { Repa } = require('../models/Repair');

const http = require('http');
const fs = require('fs'); 

const express = require('express');
const repairRouter = express.Router();

repairRouter.use(express.json())
repairRouter.use(express.urlencoded({extended:false}));

repairRouter.use(express.static(__dirname));

repairRouter.get('/', async(req, res) => {
    try {
        const repaFound = await Repa.find({});
        res.status(200).send(repaFound);
    } catch {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

repairRouter.post('/post', async(req, res) => {
    try {
        console.log("posting information");
        console.log(req.body);

        let { pNo, pName, pPrice } = req.body;

        if (!pNo || !pName || !pPrice)
            return res.status(400).send({ err: "All informations are required" });

        // 데이터베이스에 저장
        const repa = new Repa(req.body);
        await repa.save();
        
        return res.send({ repa });
          
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

//삭제
repairRouter.post('/repa/delete', async(req, res) => {
    try {
        const repaBody = new Repa(req.body);
        const ret = Repa.Delete(repaBody.pNo);
        
        if (ret == null) {
            return res.status(500).send({ err: err.message })
        }

        return res.send(ret);
    } catch(err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
    }
});

//수정
repairRouter.post('/repa/update', async(req, res) => {
    try {
        //const Body = new Cust({ cusNo: req.body.before });
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
    repairRouter
}