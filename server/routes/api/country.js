const express = require('express');
const router = express.Router();
const { Country } = require("../../models/Country");

// returns all country information
router.get("/", (req, res) => {
    Country.find({}, null , {sort: {name: 1}}).exec((err, countries) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        } else {
            console.log(countries)
            res.status(200).json({
                    success: true, 
                    countries, postSize: 
                    countries.length 
                })
        }
    })
})

// returns information about a single country
router.get("/:countryName", (req, res) => {
    country = req.params.countryName;
    Country.findOne({linkName : country}).exec((err, data) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        } else {
            res.status(200).json({
                success: true, 
                data,
            })
        }
    })
})

module.exports = router;
