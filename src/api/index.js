const express = require('express');

const getlaunchdata = require('./getlaunchdata');
const search = require('./search');
const getdetails=require('./getdetails');
const getsongurl=require('./getsongurl');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - Root Request'
  });
});

router.use('/getlaunchdata',getlaunchdata);
router.use('/search',search);
router.use('/getdetails',getdetails);
router.use('/getsongurl',getsongurl);
module.exports = router;
