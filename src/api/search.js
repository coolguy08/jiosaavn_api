const express = require('express');
const { Search } = require('../endpoints');
const { get } = require('../get');
const router = express.Router();


router.get('/', async (req, res) => {

      const query=req.query.query;
     
      if(!query){
          res.json({"error":"Invalid Arguments"});
          return;
      }
      const response=await get(Search(query));
      res.status(200).json({"data":response.data,"source":"API"});
    
  

  });

module.exports = router;
