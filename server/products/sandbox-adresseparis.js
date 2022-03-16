/* eslint-disable no-console, no-process-exit */
const adresseparisbrand = require('../sources/adresseparisbrand');

let results = []
async function sandbox (eshop = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=116') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const adresseparisProducts = await adresseparisbrand.scrape(eshop);

    console.log(adresseparisProducts);
    console.log(adresseparisProducts.length)
    console.log('done');
    adresseparisProducts.forEach(product => results.push(product));
    return results ;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

//sandbox(eshop);
module.exports = sandbox(eshop);
