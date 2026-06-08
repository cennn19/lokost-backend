const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const Transaksi = require('../models/Transaksi');
const Budget = require('../models/Budget');
const Logistik = require('../models/Logistik');
const Kategori = require('../models/Kategori');


// route register
router.post('/register', async function(req, res){
    try{
        console.log('Register attempt:', req.body) 
        const {username, password} = req.body;
        if(password.length < 8){
            return res.status(400).json({message: 'Password minimal 8 karakter'})
        }
    
        if(await User.findOne({username})){
            res.status(400).json({message: 'Username sudah digunakan'})
        }else{
            new User({username, password: await bcrypt.hash(password, 10)}).save();
            res.json({message: 'Registrasi berhasil'})
        }
    }catch{
        console.log('Register error:', err)
        res.status(500).json({message : 'Terjadi Kesalahan Server'})
    }
})

// route login
router.post('/login',async function(req, res){
    try{
        const {username, password} = req.body;
    
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({message: 'username tidak ditemukan'})
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn : '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 hari dalam ms
        })
        res.json({message: 'Login berhasil'})
    }else {
        res.status(400).json({ message: 'Password salah' }) 
    }
    }catch{
        res.status(500).json({message :'Terjadi Kesalahan Server'})
    }
})

//route delete
router.delete('/data', authMiddleware, async function (req, res){
    try{
        const userId = await req.user.userId;

    await Transaksi.deleteMany({userId})
    await Budget.deleteMany({userId})
    await Logistik.deleteMany({userId})
    await Kategori.deleteMany({userId})

    res.status(200).json({message : "Semua data berhasil dihapus"})
    }catch{
        res.status(500).json({message : 'Terjadi Kesalahan Server'})
    }
})

// router cek token
router.get('/check', authMiddleware, async function(req, res){
    res.json({ loggedIn: true })
})

module.exports = router;