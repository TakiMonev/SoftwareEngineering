const { Schema, model, Types} = require('mongoose')

const PartListSchema = new Schema({
    plNo: { type: String, required: true },
    pNo: { type: String },
    pName: { type: String },
    cNo: { type: String },
    CName: {type: String }
    }, 
    { timestamps: true }
);

const Pali = model('pali', PartListSchema);
module.exports = { Pali };