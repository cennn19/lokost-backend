const mongoose = require('mongoose');

const logistikSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    nama : String,
    jumlah : Number,
    harga : Number,
    satuan : String,
})

module.exports = mongoose.model('Logistik', logistikSchema)