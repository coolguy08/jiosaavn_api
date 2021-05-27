const express = require('express');
const { GetDetails } = require('../endpoints');
const { get } = require('../get');
const router = express.Router();


router.get('/', async (req, res) => {

      const type=req.query.type;
      const id=req.query.id;
      const page=req.query.page || 1;
      const n=req.query.n || 10;
     
      if(!type || !id){
          res.json({"error":"Invalid Arguments"});
          return;
      }
      const response=await get(GetDetails(id,type,page,n));
      res.status(200).json({"data":response.data,"source":"API"});
    
  

  });

module.exports = router;
