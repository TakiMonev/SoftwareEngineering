const { Schema, model, Types} = require('mongoose')

const SellSchema = new Schema({
    serialNo: { type: String, required: true },
    cusNo: { type: String },
    pNo: { type: String },
    sDate: { type: String },
    sPrice: { type : Int },
    sTag: { type : Int }
    }, 
    { timestamps: true }
);

const Sell = model('sell', SellSchema);
module.exports = { Sell };