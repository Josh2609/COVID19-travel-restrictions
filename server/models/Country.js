const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = mongoose.Schema({
    name: String,
    entryRestrictions: Boolean,
    exitRestrictions: Boolean,
    transitRestrictions: Boolean,
    quarantineRequired: Boolean,
    restrictionLevel: Number,
    restrictions: String
})

countrySchema.index({name : 1});

const Country = mongoose.model('Country', countrySchema);

module.exports = { Country }