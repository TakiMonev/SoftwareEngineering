const { Router } = require("express");
const mongoose = require("mongoose");
const { Empl } = require("../models/Employ");
const { Employ } = require("../classes/emplClass");

const http = require("http");
const fs = require("fs");
var path = require("path");

const express = require("express");
const employRouter = express.Router();

const ejs = require("ejs");
var app = express();

employRouter.use(express.json());
employRouter.use(express.urlencoded({ extended: false }));

employRouter.use(express.static(__dirname));

employRouter.get("/:worNo", async (req, res) => {
  let { worNo } = req.params;
  const employFound = await Empl.find({ worNo: worNo });
  console.log("employFound : " + employFound);
  return res.send({ employFound });
});

employRouter.get("/", async (req, res) => {
  try {
    const employFound = await Empl.find({});
    res.status(200).send(employFound);
  } catch {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

employRouter.post("/post", async (req, res) => {
  try {
    console.log("posting information");
    console.log(req.body);

    let { worNo, worId, worPwd, worName, worTel, worPosition } = req.body;

    if (!worNo || !worId || !worPwd || !worName || !worTel || !worPosition)
      return res.status(400).send({ err: "All informations are required" });

    // 데이터베이스에 저장
    const worker = new Empl(req.body);
    await worker.save();

    return res.send({ worker });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

module.exports = {
  employRouter,
};
