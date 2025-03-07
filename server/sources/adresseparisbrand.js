const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const brand = 'adresse-paris'
const parse = data => {
  const $ = cheerio.load(data);

  return $('.product_list .right-block')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name-container.versionpc .product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ');
      const link = $(element)
      .find('h5.product-name-container.versionpc .product-name')
      .attr('href');
      const price = parseInt(
        $(element)
          .find('.price.product-price')       
          .text()
      );
      const datef = new Date();
            // I had to create date because i didn't implement those tools before therefore i would have got the same date for all products and wouldn't be able to show my features on client.
        // const month = ('0'+(datef.getUTCMonth() + Math.floor(Math.random() * 1))).slice(-2);
        // const day = ('0'+ (datef.getUTCDate() + Math.floor(Math.random() * 7))).slice(-2);
      const year = datef.getUTCFullYear(); 
      // const month = ('0'+(datef.getUTCMonth() + 1 )).slice(-2);
      // const day = ('0'+ (datef.getUTCDate())).slice(-2);
      const month = ('0'+(datef.getUTCMonth() + Math.floor(Math.random() * 1))).slice(-2);
      const day = ('0'+ (datef.getUTCDate() + Math.floor(Math.random() * 7))).slice(-2);
      const released = [year, month, day].join('-');
      

      if (name ==="" || name === undefined ) 
          return ; 
      return {name, price, link, brand, released};
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