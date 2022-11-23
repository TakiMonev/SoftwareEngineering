const { Schema, model, Types} = require('mongoose')

const RepairSchema = new Schema({
    repNo: { type: String, required: true },
    serialNo: { type: String },
    repDate: { type: String },
    repReason: { type: String },
    repFrom: { type : String },
    repTo: { type : String },
    repPrice: {type : Int } 
    }, 
    { timestamps: true }
);

const Repa = model('repa', RepairSchema);
module.exports = { Repa };