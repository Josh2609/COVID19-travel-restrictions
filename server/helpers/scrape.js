var request = require('request');
var cheerio = require('cheerio');

class Scrape {

  // scrapes the country info from the gov website
  static getCountryInfoScrape(fcoURL, callback) {
    console.log(fcoURL)
    request(fcoURL, function (error, response, html) {
      //console.log(response)
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(html);
        //console.log($('div.gem-c-govspeak govuk-govspeak direction-ltr'))
        //console.log(cheerio.html($('.gem-c-govspeak.govuk-govspeak.direction-ltr')));


        // div that contains the audience score, uses class 'meter-value'
        //console.log(cheerio.load(html)) $('[class$="value"]')
        var data = []
        $('div.gem-c-govspeak.govuk-govspeak.direction-ltr').children().next().next().next().each(function (i, element) {
          //console.log(":*******" + $(this).html())
          // callback (null, data);
          if ($(this).text() === "Regular entry requirements") {
            return false
          }
          data[i] = $(this).html();
          //console.log(data)
          //console.log($(this).children('[id$="in-response-to-coronavirus"]').next().text())
          //var score = $(this).children().text(); // get the child elements of the div, in this case should only be the score  
          //console.log(score);

        });
        console.log(data)
        callback(null, data);
      }
    });
  }
  // uses the gov api to retrieve the country info
  static getCountryInfoAPI(countryName, callback) {
    console.log(countryName);
    const url = "https://www.gov.uk/api/content/foreign-travel-advice/" + countryName;

    // uses the gov api to retrieve travel advice from FCO for a country
    // api returns json. the info we want is in body{details{parts}}
    // api doesn't return individual pages so have to filter out ones that aren't entry requirements
    // then filter out text before and after the info we want
    // messy but does the job
    request(url, { json: true }, (err, response, body) => {
  
      //filter to only get the entry requirements information
      var oldArr = body.details.parts;
      var newArr = oldArr.filter(function (val) {
        return val.title && val.title.indexOf("Entry requirements") == 0;
      });
      //remove filler text before content
      var aftSplit = newArr[0].body.split('<h2 id=\"regular-entry-requirements')[0]
      //remove normal entry requirements outwith covid
      var bSplit = aftSplit.split('travel documents meet their requirements.')[1]
      callback(null, bSplit);
    });


  }
}

module.exports = Scrape;