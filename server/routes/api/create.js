const express = require('express');
const router = express.Router();
const { Country } = require("../../models/Country");

router.post("/", (req, res) => {
	console.log(req.body)
	
	var country =  new Country({ 
		name: req.body.country, 
		iso3: req.body.iso3,
		linkName: req.body.country.replace(/\s+/g, '-').toLowerCase(),
		restrictions: {
			entry: req.body.entryRadio,
			transit: req.body.transitRadio,
			quarantine: req.body.quarantineRadio,
			level: req.body.level || 3,
			fco: {
				description: req.body.text
			}
		}
	});

	console.log(country)
	country.save(function (err) {
		if (err) return handleError(err);
		// saved!
	});
	

	res.status(200).json({ success: true });

})

module.exports = router;
