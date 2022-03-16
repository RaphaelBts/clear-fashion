/* eslint-disable no-console, no-process-exit */
const montlimart= require('../sources/montlimartbrand');

async function sandbox (eshop = 'https://www.montlimart.com/toute-la-collection.html?limit=all') {
  
let results = []
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const montlimartProducts = await montlimart.scrape(eshop);

    //console.log(montlimartProducts);
    console.log(montlimartProducts.length);
    console.log('done');

    montlimartProducts.forEach(product => results.push(product));
    return results 
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;
module.exports.products = sandbox(eshop) ;
