const adresseparis = require('../products/products-adresseparis');
const montlimard = require('../products/products-montlimard');
const dedicatedbrand = require('../products/products-dedicatedbrand');

const { MongoClient, ServerApiVersion } = require('mongodb');

const URI = "mongodb+srv://user1:TreoprepoeIK@clear-fashion.j2y64.mongodb.net/products?retryWrites=true&w=majority";
const  DATABASE_NAME = "clear-fashion";
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function sandbox (eshop = 'https://adresse.paris/630-toute-la-collection') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await adresseparisbrand.scrape(eshop);

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
