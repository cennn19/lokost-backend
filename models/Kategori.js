const mongoose = require('mongoose');

const kategoriSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    nama : String,
    nilai : Number
})

module.exports = mongoose.model('Kategori', kategoriSchema)