'use strict';

let express = require('express');
let router = express.Router();
let Scrape = require('../helpers/scrape.js');

router.get('/:countryName', function(req, res) {
    var countryName = req.params.countryName;
    const request = require('request'); 
    const fcoURL = "https://www.gov.uk/foreign-travel-advice/" + countryName + "/entry-requirements"
    //res.send(govURL);
    request(fcoURL, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }

        Scrape.getCountryInfo(fcoURL, (err, countryData) => {


        });
    });
});

module.exports = router;
