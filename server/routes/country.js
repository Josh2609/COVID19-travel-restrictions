const express = require('express');
const router = express.Router();
const { Country } = require("../models/Country");

router.get("/", (req, res) => {
    Country.find().exec((err, countries) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({success: true, countries, postSize: countries.length })
    })

})

module.exports = router;
