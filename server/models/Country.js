const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fcoSchema = mongoose.Schema({
    description : String
})

const restrictionsSchema = mongoose.Schema({
    entry : Boolean,
    transit : Boolean,
    quarantine : Boolean,
    level : Number,
    fco : fcoSchema 
})

const countrySchema = mongoose.Schema({
    iso3: String,
    name: String,
    linkName: String,
    restrictions: restrictionsSchema
})

countrySchema.index({name : 1});

const Country = mongoose.model('Country', countrySchema);

module.exports = { Country }