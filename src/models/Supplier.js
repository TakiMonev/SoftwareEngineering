const { Schema, model, Types} = require('mongoose')

const SupplierSchema = new Schema({
    supNo: { type: String, required: true },
    supName: { type: String },
    supRepre: { type: String },
    supTel: { type: String },
    }, 
    { timestamps: true }
);

const Supp = model('supp', SupplierSchema);
module.exports = { Supp };