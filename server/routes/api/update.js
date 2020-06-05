const express = require('express');
const router = express.Router();
const { Country } = require("../../models/Country");

// returns information about a single country
router.post("/", (req, res) => {
    // var form = new multiparty.Form();
    // form.parse(req, function(err, fields, files) {
    //     console.log(fields)
    // })
    console.log(req.body.text)

    Country.findOne({ linkName: 'canada' }).exec((err, data) => {
        if (err) {
            return res.status(400).json({ success: false, err })
        } else {
            data.restrictions.fco.description = req.body.text;
            data.save();
            res.status(200).json({ success: true});
        }
    // res.status(200).json({
    //     success: true, 
    // })
    })
    
})

module.exports = router;
