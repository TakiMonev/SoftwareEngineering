const { Schema, model, Types} = require('mongoose')

const PartListSchema = new Schema({
    plNo: { type: String, required: true },
    pNo: { type: String },
    pName: { type: String },
    pMaker: { type: String },
    pPrice: { type : Int }
    }, 
    { timestamps: true }
);

const Pali = model('pali', PartListSchema);
module.exports = { Pali };