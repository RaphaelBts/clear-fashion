const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop : 
 * @param  {String} data - html response
 * @return {Array} products
 */
const brand = "montlimart"
const parse = data => {
  const $ = cheerio.load(data);

  return $('.category-products').find('li.item') // look at each item
    .map((i, element) => {
      const name = $(element)
        .find('h2.product-name')
        .find('a')
        .attr('title');

      const link = $(element)
      .find('h2.product-name')
      .find('a')
      .attr('href');

      const price = parseInt(
        $(element)
          .find('div.price-box')
          .find('span.price')
          .text()); // Rajouter d'autres bails genre materiaux + images + date de scraping. 
       // return montlimart pour associer les items ? 
      const datef = new Date();
      // I had to create date because i didn't implement those tools before therefore i would have got the same date for all products and wouldn't be able to show my features on client.

      const month = ('0'+(datef.getUTCMonth() + Math.floor(Math.random() * 1))).slice(-2);
      const day = ('0'+ (datef.getUTCDate() + Math.floor(Math.random() * 7))).slice(-2);
      const year = datef.getUTCFullYear(); 
      // const month = ('0'+(datef.getUTCMonth() + 1 )).slice(-2);
      // const day = ('0'+ (datef.getUTCDate())).slice(-2);
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
