const express = require('express');
const { GetSongDetails} = require('../endpoints');
const { get } = require('../get');
const router = express.Router();
const cache=require("memory-cache");
const fetch=require("node-fetch");

const quality={
    "96":"96",
    "160":"160",
    "320":"320"
}

const songs_cache=new cache.Cache();


let song_base="https://sagraecdnems0$.cdnsrv.jio.com/aac.saavncdn.com/";


function decode(str)
{

r='';
for(var i=0;i<str.length;i++)
{
if(str[i]=='+' || str[i]==' ')
{
r+='%2B';
}
else if(str[i]=='/')
{
r+='%2F';
}
else
{
r+=str[i];
}
}

return r;



}




async function getsongurl(encrypted_media_url){
  
  const media_url=decode(encrypted_media_url)
  geturl=`https://www.jiosaavn.com/api.php?__call=song.generateAuthToken&url=${media_url}&bitrate=160&api_version=4&_format=json&ctx=wap6dot0&_marker=0
  `
  const authurldata=await fetch(geturl).then(data=>data.text());
  const auth_data=JSON.parse(authurldata);
   
  const url=await redirected_url(auth_data.auth_url);

  return url;

}

async function redirected_url(data_url)
{
  try{
      const d=await fetch(data_url);
      return d.url;
  }
  catch(err)
  {
    console.log(err);
  }


}


router.get('/', async (req, res) =>{

      const id=req.query.id;
      const bitrate=quality[req.query.bitrate] || "96";
     
      if(!id){
        res.json({"error":"Invalid Arguments"});
        return;
      }

      if(songs_cache.get(id))//if song url is present in the cache then return it
      {
        let url=songs_cache.get(id).split('_')[0]+'_'+bitrate+'.mp4';
        res.status(200).json({"url":url,"source":"Cache"});
        return;
      }
      const song=await get(GetSongDetails(id));

      if(song.data[id].media_preview_url==undefined){ //if the song does not have media preview url
        const url =await getsongurl(song.data[id].encrypted_media_url);
        songs_cache.put(id,url);
        res.status(200).json({"url":url,"source":"by encryption"});
        return;
      }
      
      
      const media_preview_url=song.data[id].media_preview_url;
      const media_url_array=media_preview_url.split("/");

      let randomserver=Math.floor(Math.random()*6);

      if(randomserver==0){
        randomserver=randomserver+1;
      }
      song_base=song_base.replace("$",randomserver);

      let songurl=song_base+`${media_url_array[3]}/${media_url_array[4]}`;
      songurl=songurl.replace("_p","");
      songurl=songurl.replace("_96","_"+bitrate);//converting to the given quality

      //putting song into cache
      songs_cache.put(id,songurl);
      
    //   const response=await get(Search(query));
      res.status(200).json({"url":songurl,"source":"API"});
    
  

  });

module.exports = router;
