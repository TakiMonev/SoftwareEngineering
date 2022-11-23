const { Schema, model, Types} = require('mongoose')

const CustomerSchema = new Schema({
    cusNo: { type: String, required: true },
    cusName: { type: String },
    cusTel: { type: String },
    cusAddr: { type : String }
    }, 
    { timestamps: true }
);

const Cust = model('cust', CustomerSchema);
module.exports = { Cust };