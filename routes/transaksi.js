const express = require('express');
const router = express.Router();
const Transaksi = require('../models/Transaksi');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async function(req, res){
  try{
    const transaksi = await Transaksi.find({userId: req.user.userId});
    res.json(transaksi);

  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
})

router.post('/', authMiddleware, async function(req, res){
  try{
    const {nama, nominal, jenis, tanggal} = req.body;
    const transaksi = new Transaksi({userId: req.user.userId, nama, nominal, jenis, tanggal});
    await transaksi.save();
    res.json({message: 'Transaksi berhasil ditambahkan'})  
  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
})

router.delete('/:id', authMiddleware, async function(req, res){
  try{
    await Transaksi.findOneAndDelete(
        {_id: req.params.id, userId: req.user.userId},
        {userId: req.user.userId}
      )
      res.json({message: 'Transaksi berhasil dihapus'})
  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
})

module.exports = router;