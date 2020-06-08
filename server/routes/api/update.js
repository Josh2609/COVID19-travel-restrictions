const express = require('express');
const router = express.Router();
const { Country } = require("../../models/Country");

router.post("/", (req, res) => {

    console.log(req.body)

    Country.findOne({ linkName: req.body.country }).exec((err, data) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        } else {
            data.restrictions.entry = req.body.entryRadio || false;
            data.restrictions.transit = req.body.transitRadio || false;
            data.restrictions.quarantine = req.body.quarantineRadio || false;
            data.restrictions.level = req.body.levelSelect;
            data.restrictions.fco.description = req.body.text || 'Restrictions currently under review.';
            data.save();
            res.status(200).json({ success: true});
        }

    })
    
})

module.exports = router;
