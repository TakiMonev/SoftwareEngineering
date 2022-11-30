const { Schema, model, Types} = require('mongoose')

const PartListSchema = new Schema({
    plNo: { type: Number, required: true },
    pNo: { type: Number },
    pName: { type: String },
    cNo: { type: Number },
    CName: {type: String }
    }, 
    { timestamps: true }
);

const Pali = model('pali', PartListSchema);
module.exports = { Pali };