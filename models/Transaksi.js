const mongoose = require('mongoose');

const transaksiSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    nama : String,
    nominal : Number,
    jenis : String,
    tanggal : String
})

module.exports = mongoose.model('Transaksi', transaksiSchema)