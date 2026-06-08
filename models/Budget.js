const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    total : Number,
    terpakai : Number
})

module.exports = mongoose.model('Budget', budgetSchema)