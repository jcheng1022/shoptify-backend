const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    item_name:String,
    item_price: Number,
    item_description:String,

}, {timestampts:true})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;