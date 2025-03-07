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
        // I had to create date because i didn't implement those tools before therefore i would have got the same date for all products and wouldn't be able to show my features on client.
        const year = datef.getUTCFullYear(); 
        const month = ('0'+(datef.getUTCMonth() + Math.floor(Math.random() * 2))).slice(-2);
        const day = ('0'+ (datef.getUTCDate() + Math.floor(Math.random() * 8))).slice(-2);
        // const month = ('0'+(datef.getUTCMonth() + 1 )).slice(-2);
        // const day = ('0'+ (datef.getUTCDate())).slice(-2);
        const released = [year, month, day].join('-');
      if (name ==="" || name === undefined ) 
          return ; 
      return{name,price,link,photo,_id,brand,released};

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



