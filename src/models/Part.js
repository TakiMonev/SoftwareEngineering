const { Schema, model, Types} = require('mongoose')

const PartSchema = new Schema({
    pNo: { type: Number, required: true },
    pName: { type: String },
    pPrice: { type: String }
    }, 
    { timestamps: true }
);

const Part = model('part', PartSchema);
module.exports = { Part };