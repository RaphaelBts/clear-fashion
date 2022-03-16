const adresseparis = require('../sandbox-adresseparis');
const montlimard = require('../sandbox-montlimard');
const dedicatedbrand = require('../sandbox-dedicatedbrand');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://user:Lp3daFeXnT89XFU6@cluster0.dxsim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const  MONGO_DB_NAME = "clear-fashion";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const db = client.db(MONGO_DB_NAME)
const collection = db.collection('products');


async function insertProd(brandsite) {

  const products = await brandsite.getProducts;

  try {
    await client.connect();
    const collection = client.db(DATABASE_NAME).collection('products');
    const result = await collection.insertMany(products);

    console.log(`Items from ${site} added to the ${MONGO_DB_NAME} collection : ${result.insertedIds}`);
  } finally {
    await client.close();
  }
}

async function RemovedAllitems() {
  try {
    await client.connect();

    const collection = client.db(DATABASE_NAME).collection('products');
    const result = await collection.deleteMany({});

    console.log(`In ${DATABASE_NAME}/${COLLECTION_NAME} collection : all items were removed${result}`);
  } finally {
    await client.close();
  }
}

// async function ProductBrand(brand) {
//   const products = await collection.find({brand:brand}).toArray();
//   console.log(products);
// }

async function LessThanPrice(price){
  const products = await collection.find({price : {$lt:price}}).toArray();
  console.log(products);
}

async function SortedByPrice(){
  const products = await collection.find().sort({price: 1}).toArray();
  console.log(products);
} 


