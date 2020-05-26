'use strict';

let express = require('express');
let router = express.Router();
let RestrictionsFCO = require('../../helpers/RestrictionsFCO.js');
const { Country } = require("../../models/Country");

// retrieve the latest restrictions from FCO
router.get('/:countryName', function(req, res) {
    const countryName = req.params.countryName;
    
    RestrictionsFCO.getRestrictions(countryName, (err, countryData) => {
        res.send(countryData);
    });
});

// updates the 'restrictions' field in the database for the specified country by getting data
// from FCO
router.patch('/:countryName', function(req, res) {
    const countryName = req.params.countryName;

    RestrictionsFCO.getRestrictions(countryName, (err, restrictionsUpdate) => {
      Country.findOne({ name: countryName }).exec((err, data) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        } else {
            data.restrictions = restrictionsUpdate;
            data.save();
            res.status(200).json({ success: true});
        }
      })
    });
});

// updates all countries 'restrictions' in the database from FCO
router.patch('/', function (req, res) {
    // TODO
    //loop over every country and update
});

module.exports = router;
