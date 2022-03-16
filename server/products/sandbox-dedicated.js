/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('../sources/dedicatedbrand');
let results = []
async function sandbox() {
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
    console.log(dedicatedbrandProducts);
    console.log(dedicatedbrandProducts.length);
    console.log('done');
    dedicatedbrandProducts.forEach(product => allpages.push(product));
    }

  } 
}catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

//sandbox(eshop);
module.exports = sandbox(eshop);

