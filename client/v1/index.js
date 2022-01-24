// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);


/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

var cheapest_t_shirt=MY_FAVORITE_BRANDS[1].url
console.log(cheapest_t_shirt)



/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */

// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable
var num_prod=marketplace.length
console.log(num_prod)

// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

//console.log(marketplace)
var products_brands_name=[]
for (const i of Array(num_prod).keys()) {
  products_brands_name[i]=marketplace[i].brand
}
products_brands_name=[... new Set(products_brands_name)]
console.log(products_brands_name);
console.log(products_brands_name.length)

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest
// 3. Log the variable
var sorted_price = marketplace.sort(function(a, b) {return a.price - b.price});
console.log(sorted_price);

// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

var sorted_date = marketplace.sort(function(b,a){return new Date(a.date).getTime()- new Date(b.date).getTime()})
console.log(sorted_date);

// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list
var filter_price = marketplace.filter(function(x){ return x.price >= 50 && x.price <= 100});
console.log(filter_price);


// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average

var average_basket=0
for (const i of Array(num_prod).keys()) {
 average_basket+=marketplace[i].price
}
console.log(num_prod)
average_basket=average_basket/num_prod
console.log(`The average basket is ${average_basket}`)



/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//
// 2. Log the variable
// 3. Log the number of products by brands
var const_brands ={}

const new_marketplace=JSON.parse(JSON.stringify(marketplace));
for (const i of Array(num_prod).keys()){
  delete new_marketplace[i].brand ;
}

for (const brand_name of products_brands_name) {
   const_brands[`${brand_name}`]=[]; 
  }

for (const i of Array(num_prod).keys()) {
  const_brands[`${marketplace[i].brand}`].push(new_marketplace[i]);

}

console.log(const_brands);

// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort
var sorted_price={}
for (const brand_name of products_brands_name)
{
   sorted_price[`${brand_name}`] =[...const_brands[`${brand_name}`]].sort(function(b,a){return a.price-b.price;});
   console.log(sorted_price);
}
console.log(sorted_price);

// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort
var sorted_date ={}
for (const brand_name of products_brands_name)
{
 sorted_date[`${brand_name}`] =[...const_brands[`${brand_name}`]].sort(function(b,a){return new Date(a.date).getTime() - new Date(b.date).getTime()});
}
console.log(sorted_date);



/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products


const asc = arr => arr.sort((a, b) => a - b);

const quantile = (arr, q) => {  // stack overflow... 
  const sorted = asc(arr);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
      return sorted[base];
  }
};

var p90_value ={}
var p90 = {}

for (const brand_name of products_brands_name)
{
p90_value[`${brand_name}`] = [];
  for (const i of Array(const_brands[`${brand_name}`].length).keys())
  {
  p90_value[`${brand_name}`].push(const_brands[`${brand_name}`][i]['price'])
  }

  p90[`${brand_name}`]= quantile(p90_value[`${brand_name}`],0.10);
}
console.log(p90);



/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.
var new_products=true ; 
var less_2weeks= 1000 * 60 * 60 * 24 * 14 ;
for (const i of Array(COTELE_PARIS.length).keys())
{
  if ( new Date(COTELE_PARIS[i].released).getTime() < Date.now()-less_2weeks){ // I checked 2022-01-10 and 2022-01-20 and it worked
    new_products=false ;
  }
}
if (new_products==false)
{
console.log("Not only new products");
}
else 
{
  console.log(" There are only new products ");
}

//🎯 TODO: Reasonable price
// 1. Log if coteleparis is a reasonable price shop (true or false)
//  reasonable price if all the products are less than 100€
var reasonable=true;
const reasonable_price=100;

for (const i of Array(COTELE_PARIS.length).keys())
{
  if ( COTELE_PARIS[i].price > reasonable_price){
    reasonable=false;
    break ; 
  }
}if (reasonable==false )
{
  console.log(" Not a reasonable price shop !");
}
else
{
  console.log("Reasonable price shop");
}

// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product
for (const i of Array(COTELE_PARIS.length).keys())
{
  if ( COTELE_PARIS[i].uuid === `b56c6d88-749a-5b4c-b571-e5b5c6483131` ){
      var specific_product= COTELE_PARIS[i];
      break ; 
  }
}
console.log(specific_product);


// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

var new_COTELE_PARIS=[...COTELE_PARIS];
for (const i of Array(COTELE_PARIS.length).keys())
{
  if ( new_COTELE_PARIS[i].uuid === `b56c6d88-749a-5b4c-b571-e5b5c6483131` ){
      delete new_COTELE_PARIS[i]
  }
}
console.log(new_COTELE_PARIS);

// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?
console.log(jacket);
console.log(blueJacket);
// A  key-value ref favorite=true was added to the jacket and ALSO updated the bluejacket.
blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties
let jacket2 = {...blueJacket};
jacket2.favorite=true
console.log(jacket2);
console.log(blueJacket);


/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage

let localStorage={...MY_FAVORITE_BRANDS};
console.log(localStorage);