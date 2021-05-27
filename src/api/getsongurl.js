const express = require('express');
const { GetSongDetails} = require('../endpoints');
const { get } = require('../get');
const router = express.Router();
const cache=require("memory-cache");


const quality={
    "96":"96",
    "160":"160",
    "320":"320"
}

const songs_cache=new cache.Cache();


const song_base="https://sagraecdnems01.cdnsrv.jio.com/aac.saavncdn.com/";

router.get('/', async (req, res) => {

      const id=req.query.id;
      const bitrate=quality[req.query.bitrate] || "96";
     
      if(!id){
        res.json({"error":"Invalid Arguments"});
        return;
      }

      if(songs_cache.get(id))//if song url is present in the cache then return it
      {
        res.status(200).json({"url":songs_cache.get(id),"source":"API"});
        return;
      }
      const song=await get(GetSongDetails(id));
      
      const media_preview_url=song.data[id].media_preview_url;
      const media_url_array=media_preview_url.split("/");
      let songurl=song_base+`${media_url_array[3]}/${media_url_array[4]}`;
      songurl=songurl.replace("_p","");
      songurl=songurl.replace("_96","_"+bitrate);//converting to the given quality

      //putting song into cache
      songs_cache.put(id,songurl);
      
    //   const response=await get(Search(query));
      res.status(200).json({"url":songurl,"source":"API"});
    
  

  });

module.exports = router;
