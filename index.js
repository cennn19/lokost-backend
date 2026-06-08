require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/user');
const transaksiRoutes = require('./routes/transaksi');
const budgetRoutes = require('./routes/budget');
const logistikRoutes = require('./routes/logistik');
const kategoriRoutes = require('./routes/kategori');
const cookieParser = require('cookie-parser');
app.use(express.json());
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 10000
});

app.use(limiter);
app.use(cors({
    origin: [
        'http://127.0.0.1:5501',
        'http://localhost:5501',
        'http://localhost:3000',
        'https://lokost-backend-production.up.railway.app'
    ],
    credentials: true
}))
app.use(cookieParser());
app.use('/api/user', userRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/logistik', logistikRoutes);
app.use('/api/kategori', kategoriRoutes);
const path = require('path');
app.use(express.static(path.join(__dirname, '../Lokost')));
mongoose.connect(process.env.MONGODB_URI)
.then(function(){
        console.log('Terhubung ke MongoDB!')
    })
    .catch(function(err){
        console.log('Gagal konek:', err)
    })

app.listen(process.env.PORT || 3000, function(){
    console.log('Server berjalan!')
})