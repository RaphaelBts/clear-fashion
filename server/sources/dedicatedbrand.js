const fetch = require('node-fetch');
const cheerio = require('cheerio');

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.productList-container.productList')
    .map((i, element) => {
      const name = $(element)
        .find('.productList-title')
        .text()
        .trim()
        .replace(/\s/g, ' ');

      const link = $(element)
        .find('h2.productList-link')
        .attr('href');

      const image = $(element)
      .find('.productList-image img')
      .attr('data-src');

      const price = parseInt(
        $(element)
          .find('.productList-price')
          .text()
      );

      return {name, price, link};
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
      const result= parse(body)
      const nbPages = Math.ceil(result[0]['nbProduct']/result[0]['Current']);
      let finalresult = []
      for (let i=1;i<nbPages;i++){
        const url_next = 'https://www.dedicatedbrand.com/en/men/all-men?p' + i.toString();
      try {
        const response2 = await fetch(url_next);
        if (response2.ok){
          const 
        }
      }
      }

    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
