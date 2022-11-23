const { Schema, model, Types} = require('mongoose')

const ReturnSchema = new Schema({
    serialNo: { type: String, required: true },
    reDate: { type: String },
    reReason: { type: String },
    reTag: {type : Int } 
    }, 
    { timestamps: true }
);

const Rtrn = model('rtrn', ReturnSchema);
module.exports = { Rtrn };