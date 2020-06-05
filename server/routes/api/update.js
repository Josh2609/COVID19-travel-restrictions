const express = require('express');
const router = express.Router();
const { Country } = require("../../models/Country");

router.post("/", (req, res) => {

    console.log(req.body.country)

    Country.findOne({ linkName: req.body.country }).exec((err, data) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        } else {
            data.restrictions.fco.description = req.body.text;
            data.save();
            res.status(200).json({ success: true});
        }

    })
    
})

module.exports = router;
