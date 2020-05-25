'use strict';

let express = require('express');
let router = express.Router();
let Scrape = require('../helpers/scrape.js');
const { Country } = require("../models/Country");

router.get('/', function (req, res) {
    const countryName = req.params.countryName;
    const request = require('request');

    //loop over every country and update
    
  });

  //should probably be put
router.get('/:countryName', function (req, res) {
    const countryName = req.params.countryName;
    const request = require('request');

    Scrape.getCountryInfoAPI(countryName, (err, countryRescDesc) => {
  
      Country.findOne({ name: countryName }).exec((err, countryData) => {
        if (err) return res.status(400).json({ success: false, err })
        console.log(countryData)
        countryData.entryResDesc = countryRescDesc;
  
        countryData.save();
      })
  
      res.status(200);
    });
  });
  
  module.exports = router;
