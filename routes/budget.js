const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async function(req, res){
  try{
    const budget = await Budget.find({
        userId: req.user.userId
    });

    res.json(budget);
  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
});

router.post('/', authMiddleware, async function(req, res){
  try{
    const {total} = req.body;

    await Budget.findOneAndUpdate(
        { userId: req.user.userId },
        { total, terpakai: 0 },
        { upsert: true }
    );

    res.json({
        message: 'Budget berhasil ditambahkan'
    });

  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
});

router.put('/', authMiddleware, async function(req, res){
  try{
    const {terpakai, total} = req.body;
      const update = {};
      if(terpakai !== undefined) update.terpakai = terpakai;
      if(total !== undefined) update.total = total;
  
      await Budget.findOneAndUpdate(
          {userId: req.user.userId},
          update
      )
    await Budget.findOneAndUpdate(
      {userId: req.user.userId},
      {terpakai}
    )
    res.json({
      message : "Budget berhasil di update"
    })

  }catch{
    res.status(500).json({message :'Terjadi Kesalahan Server'})
  }
})

module.exports = router;