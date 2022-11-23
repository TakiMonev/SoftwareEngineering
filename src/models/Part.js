const { Schema, model, Types} = require('mongoose')

const PartSchema = new Schema({
    pNo: { type: String, required: true },
    pDate: { type: String },
    }, 
    { timestamps: true }
);

const Part = model('part', PartSchema);
module.exports = { Part };