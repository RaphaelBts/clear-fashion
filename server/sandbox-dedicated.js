/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');


async function sandbox () {
  try {

    let allpages=[];
    for (let i=1;;i++)
    { 
      let eshop = 'https://www.dedicatedbrand.com/en/men/all-men?p' + 1;
      console.log(`🕵️‍♀️  browsing ${eshop} source`);


    const products = await dedicatedbrand.scrape(eshop);
    if (products.length == 0){
      console.log("All items acquired");
      console.log('Total number of products : ${result.length}');
      process.exit(0)
    }

    console.log(products);
    console.log(products.length);
    console.log('done');
    products.forEach( product => allpages.push(product));
  } 
}catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
