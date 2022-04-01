const montlimart = require('./products/sandbox-montlimart');
const dedicated = require('./products/sandbox-dedicated');
const adresseparis = require('./products/sandbox-adresseparis');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:Lp3daFeXnT89XFU6@cluster0.dxsim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const  MONGO_DB_NAME = "clear-fashion";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const db = client.db(MONGO_DB_NAME)
const collection = db.collection('products');


async function insertProd(brandsite) {

  const products = await brandsite.products;

  try {
    await client.connect();
    const collection = client.db(MONGO_DB_NAME).collection('products');

   
  
    const result = await collection.insertMany(products);

    console.log(`Items from ${Object.keys(brandsite)[0]} added to the ${MONGO_DB_NAME} collection :${result.insertedIds}`); 
  } finally {
    await client.close();
  }
}
async function InsertWithoutDoublon(brandsite){

  const products = await brandsite.products;
  
  try {
    await client.connect();
    const collection = client.db(MONGO_DB_NAME).collection('products');
    for (let i = 0; i < products.length; i++) {
      console.log(products[i]);
      collection.findOne({name: products[i].name}) //products[i].title 
      .then(results => { //update products with results
          if (!results) {
          collection.insertMany(products[i]);
          } 
      }); 
      console.log(`Items from ${Object.keys(brandsite)[0]} added to the ${MONGO_DB_NAME} collection :`); // ${result.insertedIds}
    }
  } finally {
      await client.close();
    }
  }



async function RemovedAllitems() {
  try {
    await client.connect();

    const collection = client.db(MONGO_DB_NAME).collection('products');
    const result = await collection.deleteMany({});

    console.log(`In ${MONGO_DB_NAME} : all items were removed ${result.deletedCount}`);
  } finally {
    await client.close();
  }
}

async function LessThanPrice(price){
  const products = await collection.find({price : {$lt:price}}).toArray();
  console.log(products);
}

async function SortedByPrice(){
  const products = await collection.find().sort({price: 1}).toArray();
  console.log(products);
} 

RemovedAllitems().catch(console.dir);

insertProd(dedicated).catch(console.dir);
insertProd(adresseparis).catch(console.dir);
insertProd(montlimart).catch(console.dir);

// InsertWithoutDoublon(adresseparis).catch(console.dir);
// InsertWithoutDoublon(montlimart).catch(console.dir);
// InsertWithoutDoublon(dedicated).catch(console.dir);


