const express = require('express');

const getlaunchdata = require('./getlaunchdata');
const search = require('./search');
const getdetails=require('./getdetails');
const getsongurl=require('./getsongurl');
const getsongs=require('./getsongs');
const getlyrics=require('./getlyrics');


const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - Root Request',
    "API Docs" :'https://documenter.getpostman.com/view/17456794/U16jPS13#intro',
  });
});

router.use('/getlaunchdata',getlaunchdata);
router.use('/search',search);
router.use('/getdetails',getdetails);
router.use('/getsongurl',getsongurl);
router.use('/getsongs',getsongs);
router.use('/getlyrics',getlyrics);
module.exports = router;
