/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('../sources/dedicatedbrand');

async function sandbox() {
  let results = []
  try {

    let allpages=[];
    for (let i=1;;i++)
    { 
      let eshop = 'https://www.dedicatedbrand.com/en/men/all-men?p='+i;
      console.log(`🕵️‍♀️  browsing ${eshop} source`);


    const dedicatedbrandProducts = await dedicatedbrand.scrape(eshop);
    if (dedicatedbrandProducts.length == 0){
      console.log("All items acquired");
      console.log(`Total number of products : ${allpages.length}`);
      return allpages ;
    }
    else {
    //console.log(dedicatedbrandProducts);
    //console.log(dedicatedbrandProducts.length);
    dedicatedbrandProducts.forEach(product => allpages.push(product));
    }

  } 
}catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;
module.exports.products = sandbox();

