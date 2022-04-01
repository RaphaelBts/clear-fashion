const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const brand = 'dedicated'
const parse = data => {
  const $ = cheerio.load(data);
  const released = new Date();

  return $('.productList-container .productList')
    .map((i, element) => {
      const link = `https://www.dedicatedbrand.com${$(element)
        .find('.productList-link')
        .attr('href')}`;

        const price = parseInt(
          $(element)
            .find('.productList-price')
            .text());
        const name = $(element)
          .find('.productList-title')
          .text()
          .trim()
          .replace(/\s/g, ' ');
        const photo = $(element)
          .find('img')
          .attr('data-src');
          
        const _id = uuidv5(link, uuidv5.URL)
        const datef = new Date();
        const year = datef.getUTCFullYear();
        const month = ('0'+(datef.getUTCMonth() + Math.floor(Math.random() * 1))).slice(-2);
        const day = ('0'+ (datef.getUTCDate() + Math.floor(Math.random() * 7))).slice(-2);

      const date = [year, month, day].join('-');
      return{name,price,link,photo,_id,brand,date};
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};



