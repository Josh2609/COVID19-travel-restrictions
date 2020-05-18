'use strict'

module.exports = () => {

    var mongojs = require('mongojs');
    var config = require('../config');

    var db;

    if(!db)
    {
        db = mongojs('mongodb://' + config.mongo.user + ':' + config.mongo.password + '@' + config.mongo.url + '?maxPoolSize=100');

        db.createCollection('countries', {}, () => {
            console.log('Created/verified countries collection');
            db.countries = db.collection('countries');
            //db.countries.createIndex('username');
            //db.countries.reIndex();
        });

        db.on('connect', () => {
          console.log('Connected to database.');
        });

        // log errors
        db.on('error', (e) => {
          console.log('Database error: ', e);
        });

        return db;
    }
};