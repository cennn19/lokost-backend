const express = require('express');
const router = express.Router();
const Kategori = require('../models/Kategori');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async function(req, res){
  try{
    const kategori = await Kategori.find({userId: req.user.userId});
    res.json(kategori);
  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
})

router.post('/', authMiddleware, async function(req, res){
  try{
    const {nama, nilai} = req.body;
    const kategori = new Kategori({userId: req.user.userId, nama, nilai});
    await kategori.save();
    res.json({message: 'Kategori berhasil ditambahkan'})  
  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
})

router.delete('/all', authMiddleware, async function(req, res){
  try{
    const userId = req.user.userId;
    await Kategori.deleteMany({userId})
    res.json({message : 'Semua Kategori Berhasil Dihapus'})
  }catch{
    res.status(500).json({message : 'Terjadi Kesalahan Server'})
  }
})

router.delete('/:id', authMiddleware,  async function(req, res){
  try{
    await Kategori.findOneAndDelete(
        {_id: req.params.id, userId: req.user.userId},
        {userId: req.user.userId}
    )
    res.json({message: 'Kategori berhasil dihapus'})
  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
})


module.exports = router;