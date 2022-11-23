const { Schema, model, Types} = require('mongoose')

const OrderSupplySchema = new Schema({
    osNo: { type: String, required: true },
    plNo: { type: String },
    supNo: { type: String },
    osFrom: { type: String },
    osTo: { type : String },
    osNum: { type : Int },
    osPrice: { type : Int },
    osTag: { type: Int }
    }, 
    { timestamps: true }
);

const Osup = model('osup', OrderSupplySchema);
module.exports = { Osup };