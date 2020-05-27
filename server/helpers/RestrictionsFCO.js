'use strict';

let request = require('request');

class RestrictionsFCO {

  // uses the gov api to retrieve travel advice from FCO for a country
  // api returns json. the info we want is in body{details{parts}}
  // api doesn't return individual pages so have to filter out ones that aren't entry requirements
  // then filter out text before and after the info we want
  // messy but does the job  
  static getRestrictions(countryName, callback) {
    console.log(countryName);
    const url = "https://www.gov.uk/api/content/foreign-travel-advice/" + countryName.toLowerCase();

    request(url, { json: true }, (err, response, body) => {
  
      //filter to only get the entry requirements information
      var oldArr = body.details.parts;
      var newArr = oldArr.filter(function (val) {
        return val.title && val.title.indexOf("Entry requirements") == 0;
      });

      //remove filler text before content
      var aftSplit = newArr[0].body.split('<h2 id=\"regular-entry-requirements')[0]
      //remove normal entry requirements outwith covid
      var bSplit = aftSplit.split('travel documents meet their requirements.</p>')[1]

      if (bSplit.includes("in response to coronavirus")) {
        callback(null, bSplit);
      } else {
        callback(null, "<h2>Restrictions currently under review.</h2>");
      }
    });
  }
}

module.exports = RestrictionsFCO;