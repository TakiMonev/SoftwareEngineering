const { Schema, model, Types} = require('mongoose')

const RepairSchema = new Schema({
    repNo: { type: Number, required: true },
    cusNo: { type: String },
    cusName: { type: String },
    pNo: { type: String },
    pName: {type: String },
    repPrice: {type : Number } 
    }, 
    { timestamps: true }
);

const Repa = model('repa', RepairSchema);
module.exports = { Repa };