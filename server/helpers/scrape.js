var request = require('request');
var cheerio = require('cheerio');

class Scrape {

    static getCountryInfo(fcoURL, callback) {
        console.log(fcoURL)
        request(fcoURL, function (error, response, html) {
            //console.log(response)
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html);
                //console.log($('div.gem-c-govspeak govuk-govspeak direction-ltr'))
                //console.log(cheerio.html($('.gem-c-govspeak.govuk-govspeak.direction-ltr')));


                // div that contains the audience score, uses class 'meter-value'
                //console.log(cheerio.load(html)) $('[class$="value"]')
                $('div.gem-c-govspeak.govuk-govspeak.direction-ltr').each(function(i, element){
                    console.log($(this).children('[id$="in-response-to-coronavirus"]').next().next().text())
                    //var score = $(this).children().text(); // get the child elements of the div, in this case should only be the score  
                    //console.log(score);
                    callback (null);
                });
            }
        });
    }
}

module.exports = Scrape;