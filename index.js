const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.set('trust proxy', 1);
const userRoutes = require('./routes/user');
const transaksiRoutes = require('./routes/transaksi');
const budgetRoutes = require('./routes/budget');
const logistikRoutes = require('./routes/logistik');
const kategoriRoutes = require('./routes/kategori');
const cookieParser = require('cookie-parser');
const path = require('path');
const rateLimit = require('express-rate-limit');

app.use(express.json());
app.use(cookieParser());

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
        'https://lokost-backend-production.up.railway.app',
        'https://lokost.vercel.app'
    ],
    credentials: true
}))

app.use('/api/user', userRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/logistik', logistikRoutes);
app.use('/api/kategori', kategoriRoutes);

app.use(express.static(path.join(__dirname, '../Lokost')));

console.log('MONGODB_URI:', process.env.MONGODB_URI)
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