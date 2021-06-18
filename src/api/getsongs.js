const express = require('express');
const {CreateQueue,GetSongsByStation, GetDetails } = require('../endpoints');
const { get } = require('../get');
const router = express.Router();
const cache=require('memory-cache');


const caching=new cache.Cache();
const cacheTime=20*60*1000;//time in mili seconds

router.get('/', async (req, res) => {

      const station_name=req.query.name || 'Musical Covers';
      const artist_id=req.query.artist_id;
      const radio_type=req.query.radio_type;

      const type=req.query.type;

      

      if(type && type=="radio"){  //get songs by station name

       
        let stationid=req.query.stationid;
        if(!stationid){
          const d=await get(CreateQueue(station_name,radio_type));
          stationid=d.data.stationid;
         
         
         
        }
  
        let response=await get(GetSongsByStation(stationid,20));
  
        songs=[];
       
        
        Object.keys(response.data).map((key)=>{
              songs.push(response.data[key].song);
        })
  
        songs.pop();
  
        res.status(200).json({"data":songs,"source":"API"});
      
        

      }
      else if(type && type=="artist"){ //get songs by artist id
        
        if(caching.get(artist_id)){
          res.status(200).json({"data":caching.get(artist_id),"source":"cache"});
          return;
        }

        const response=await get(GetDetails(artist_id,type,1,25));
        caching.put(artist_id,response.data.topSongs,cacheTime);
        res.status(200).json({"data":response.data.topSongs,"source":"API"});

      }
      else{
        res.status(202).json({"msg":"Inalid Arguments","source":"API"});

      }

      
         
  

  });

module.exports = router;
