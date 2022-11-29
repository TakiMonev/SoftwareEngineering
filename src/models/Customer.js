const { Schema, model, Types} = require('mongoose')

const CustomerSchema = new Schema({
    // 비밀번호 
    cusNo: { type: String, required: true },
    cusId: { type: String },
    cusPwd: { type: String },
    cusName: { type: String },
    cusTel: { type: String },
    }, 
    { timestamps: true }
);

const Cust = model('cust', CustomerSchema);
module.exports = { Cust };