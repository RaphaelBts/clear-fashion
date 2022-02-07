/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montelimard = require('./sources/montlimartbrand');
const dedicatedbrand = require('./sources/adresseparisbrand');


async function sandbox (eshop = ['https://www.dedicatedbrand.com/en/men/news','https://www.montlimart.com/toute-la-collection.html','') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
