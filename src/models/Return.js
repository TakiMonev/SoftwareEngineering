const { Schema, model, Types} = require('mongoose')

const ReturnSchema = new Schema({
        cusNo: { type: String, required: true },
        cusId: { type: String },
        cusPwd: { type: String },
        cusName: { type: String },
        cusTel: { type: String },
        cusAddr: { type: String },
      },
    { timestamps: true }
);

const Rtrn = model('rtrn', ReturnSchema);
module.exports = { Rtrn };