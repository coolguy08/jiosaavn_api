const express = require('express');
const { default: fetch } = require('node-fetch');
const { GetLyrics } = require('../endpoints');

const { get } = require('../get');
const router = express.Router();


router.get('/', async (req, res) => {

    
      const id=req.query.id;
     
     
      if(!id){
          res.json({"error":"Invalid Arguments"});
          return;
      }

      const response=await get(GetLyrics(id));
    //   const data=await response.json();

    res.status(200).json({data:response.data,"source":"API"});

      
    
  

  });

module.exports = router;
