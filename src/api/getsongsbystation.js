const express = require('express');
const {CreateQueue,GetSongsByStation } = require('../endpoints');
const { get } = require('../get');
const router = express.Router();


router.get('/', async (req, res) => {

      const station_name=req.query.name || 'Musical Covers';
    //   if(!songid){
    //     res.json({"error":"Invalid Arguments"});
    //      return;
    //   }
      let stationid=req.query.stationid;
      if(!stationid){
        const d=await get(CreateQueue(station_name));
        stationid=d.data.stationid;
       
       
      }

      let response=await get(GetSongsByStation(stationid,10));

      songs=[];
     
      
      Object.keys(response.data).map((key)=>{
            songs.push(response.data[key].song);
      })

      songs.pop();

      res.status(200).json({"data":songs,"source":"API"});
    
  

  });

module.exports = router;
