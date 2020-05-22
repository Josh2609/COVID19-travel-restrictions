const express = require('express');
const router = express.Router();
const { Country } = require("../models/Country");

router.get("/", (req, res) => {
    Country.find().exec((err, countries) => {
        if (err) return res.status(400).json({ success: false, err })
        console.log(countries)
        res.status(200).json({success: true, countries, postSize: countries.length })
    })

})

router.get("/:countryName", (req, res) => {
    console.log(req.params.countryName)
    Country.findOne({name : req.params.countryName}).exec((err, countryData) => {
        if (err) return res.status(400).json({ success: false, err })
        console.log(countryData)
        res.status(200).json({success: true, countryData,})
    })
})

module.exports = router;
