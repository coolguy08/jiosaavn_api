const express = require('express');
const { GetLaunchData } = require('../endpoints');
const { get } = require('../get');
const cache=require("memory-cache");
const router = express.Router();

const LaunchDataCache=new cache.Cache();
const cacheTime=60*60*1000;//time in mili seconds

router.get('/', async (req, res) => {

  if(!LaunchDataCache.get("data"))
  {
      const response=await get(GetLaunchData());
      res.status(200).json({"data":response.data,"source":"Api"});
      LaunchDataCache.put("data",response.data,cacheTime);
  }
  else
  {
    res.status(200).json({"data":LaunchDataCache.get("data"),"source":"cache"});
  }
  

  });

module.exports = router;
