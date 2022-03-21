const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

/**
 * Import MongoClient & connexion à la DB
 */
 const { MongoClient, ServerApiVersion } = require('mongodb');
 const ObjectId = require("mongodb").ObjectID;
 
 const uri = "mongodb+srv://user:Lp3daFeXnT89XFU6@cluster0.dxsim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
 const MONGO_DB_NAME = 'clear-fashion';
 const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 client.connect((error, client) => {
  if(error) {
      throw error;
  }
  database = client.db(MONGO_DB_NAME);
  collection = database.collection("products");
  console.log("Connected to `" + MONGO_DB_NAME + "`!")});


const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});
// get one product
app.get('/products/search', (req,res) => {
  const size = parseInt(req.query.limit) || 12;
  const brand = req.query.brand || '';
  const price = parseInt(req.query.price) || -1;
  const page = parseInt(req.query.page)
  const currentPage = page 
  const pageSize = size 
  const totalCount =  collection.countDocuments()
  const countPages = totalCount /size 
  // currentpage = page
  // count (all items)
  //count (items par page)
  //CountPages 

  collection.find({ 'brand': brand }, { 'price': { $lte: price } }).skip(page > 0 ? ( ( page - 1 ) * size) : 0).limit(size).toArray()
      .then(results => res.status(200).json({"results":res,"meta":paginate(page,totalCount,size,)}))
      .catch(err => {
          console.log(err)
          throw err
      })
});
app.get('/products/:id', async (req,res) => {  // Error: Failure when receiving data from the peer
  try {
      const results = await collection.find({'_id': new ObjectId(req.params.id)}).toArray()
      res.send(results)
  } catch (err) {
      console.log(err)
      throw err
  }
});
// get all the products 
app.get('/products', (req,res) => {
  collection.find({}).toArray()
      .then(results => res.status(200).json(results))
      .catch(err => {
          console.log(err)
          throw err
      })
});
app.get('/products/brand/:brand', (req,res) => { // search products from specific brand http://localhost:8092/products/brand/dedicated

  collection.find({ 'brand': req.params.brand } ).toArray()
      .then(results => {res.send(results)
      console.log(results)})

      .catch(err => {
          console.log(err)
          throw err
      })
})
// app.get('/products/seearch', (request, response) => {
//   const limit = parseInt(request.query.limit) || 12;
//   const brand = request.query.brand || 'All brands';
//   const price = parseInt(request.query.price) || -1;
//   collection.find({ 'brand': brand }, { 'price': { $lte: price } }).toArray()
//   response.send({
//       'limit': limit,
//       'brand': brand,
//       'price': price
//   });
// });
// app.get('/products/search', (req,res) => { // search products from specific brand and price <=priced specified

//   const brand = req.query.brand ; 
//   console.log(brand);
//   //const price = req.query.price;
//   // let limit = req.query.limit;

//   collection.find({'brand': brand }).toArray()
//       .then(results =>{res.send(results)
//         console.log(results)})
//       .catch(err => {
//           console.log(err)
//           console.log(brand)
//           throw err
//       })
// })


//const products = await collection.find({price : {$lt:price}}).toArray();
app.get('/exit', function (req,res) {
  app.listen(PORT).close();
});
app.listen(PORT, ()=> {
  console.log(`📡 Running on port ${PORT}`)});
