const express = require('express');
const router = express.Router();
const Logistik = require('../models/Logistik');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async function(req, res){
  try{
    const logistik = await Logistik.find({userId: req.user.userId});
    res.json(logistik);
  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
})

router.post('/', authMiddleware, async function(req, res){
  try{
    const {nama, jumlah, harga, satuan} = req.body;
    const logistik = new Logistik({userId: req.user.userId, nama, jumlah, harga, satuan});
    await logistik.save();
    res.json({message: 'Logistik berhasil ditambahkan'})  
  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
})

router.put('/:id', authMiddleware, async function(req, res){
  try{
    const {jumlah} = req.body;
    await Logistik.findOneAndUpdate(
      {_id: req.params.id, userId: req.user.userId},
      {userId: req.user.userId, jumlah}
    )
    res.json({message: 'Stok berhasil diupdate'})
  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
})

router.delete('/:id', authMiddleware, async function(req, res){
  try{
    await Logistik.findOneAndDelete(
      {_id: req.params.id, userId: req.user.userId},
      {userId: req.user.userId}
    )
    res.json({message: 'Barang berhasil dihapus'})
  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
})

module.exports = router;