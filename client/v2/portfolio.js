// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let currentBrands = [];
let currentRecent = 'All';
let currentReasonablePrice = 'All';
let newProductsNb = 0;
let favoriteProducts = [];
let favorites ='None';

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('select[name="brand"]');
const selectSort = document.querySelector('#sort-select');

const sectionProducts = document.querySelector('#products');

const spanNbProducts = document.querySelector('#nbProducts');
const spanNbNewProducts = document.querySelector('#nbNewProducts');
const spanp50 = document.querySelector('#p50');
const spanp90 = document.querySelector('#p90');
const spanp95 = document.querySelector('#p95');
//const spanLastRelease = document.querySelector("#last-release");

//filter 
const inputRecent = document.querySelector('#recent-filter');
const inputReasonablePrice = document.querySelector('#reasonable-price-filter');
const inputFavorite = document.querySelector("#favorites-filter");

let currentButtons = [];

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Set global value of brands
 * @param {Array} brands - all the brands to display
 */
const setCurrentBrands = (brands) => {
  currentBrands = brands;
}

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */


const fetchProducts = async (page = 1, size = 12, brand = 'All', date = 'All', price='All', toSort='none', favorites='None') => {
  if (favorites==='fav') {
    return fetchfavProducts(page, size , brand , date, price, toSort)
  }
  else if (date==='recent') {
    return fetchRecentProducts(page, size, brand, price, toSort);
  } else if (price==='reasonable') {
    return fetchReasonableProducts(page, size, brand, date, toSort);
  }
  if (page>Math.ceil(currentPagination.count/size)) {
    page=1;
  }
  try {
    let fetchUrl = `https://clear-fashion-vf.vercel.app/products/search?page=${page}&size=${size}`;
    if (brand!='All'){
      fetchUrl = `https://clear-fashion-vf.vercel.app/products/search?page=${page}&size=${size}&brand=${brand}`;
    }
    const response = await fetch(fetchUrl);
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    if (toSort !== 'none') {
      body.data.result = sortProduct(body.data.result, toSort);
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

const reasonableProducts = (products) => {
  return products.filter((product) => product.price < 50);
}
const favProducts = (products) => {
  return products.filter((product) => favoriteProducts.find( fav => fav.name==product.name ));
}

const recentProducts = (products) => {

  return products.filter((product) => new Date(product.released).getTime() > Date.now()-1000 * 60 * 60 * 24 * 14);
}
const sortProduct = (products, sort) => {
  switch (sort) {
    case "price-asc":
      return products.sort(function(b,a){return b.price-a.price;});
    case "price-desc":
      return products.sort(function(b,a){return a.price-b.price;});
    case "date-asc":
      return products.sort(function(b,a){return new Date(a.released).getTime() - new Date(b.released).getTime()});
    case "date-desc":
      return products.sort(function(b,a){return new Date(b.released).getTime() - new Date(a.released).getTime()});
  }
  return products 
}

const fetchRecentProducts = async (page = 1, size = 12, brand = 'All', price='All', toSort='none') => {
  let fetched;
  if (price === 'reasonable') {
    fetched = await fetchReasonableProducts(1, currentPagination.count, brand, 'All', toSort);
  } else {
    fetched = await fetchProducts(1, currentPagination.count, brand, 'All', price, toSort);
  }
  fetched.result = recentProducts(fetched.result);

  const totalOfRecent = fetched.result.length;
  fetched.meta.pageCount = Math.ceil(totalOfRecent/size);
  fetched.meta.pageSize = size;
  if (fetched.meta.pageCount<page) { page=1; }
  fetched.meta.currentPage = page;

  fetched.result = fetched.result.slice((page-1)*size,page*size);
  return fetched;
}

const fetchfavProducts = async (page = 1, size = 12, brand = 'All', date='All',price="All" ,toSort='none') => {
  let fetched;
  if (price === 'reasonable') {
    fetched = await fetchReasonableProducts(1, currentPagination.count, brand, 'All', toSort);
  }
  if (date === 'recent') {
    fetched = await fetchRecentProducts(1, currentPagination.count, brand, 'All', toSort);
  } 
  else {
    fetched = await fetchProducts(1, currentPagination.count, brand, date, price , toSort);
  }
  fetched.result = favProducts(fetched.result)
  const totalOfReasonable = fetched.result.length;
  fetched.meta.pageCount = Math.ceil(totalOfReasonable/size);
  fetched.meta.pageSize = size;
  if (fetched.meta.pageCount<page) { page=1; }
  fetched.meta.currentPage = page;

  fetched.result = fetched.result.slice((page-1)*size,page*size);
  return fetched;
}

const fetchReasonableProducts = async (page = 1, size = 12, brand = 'All', date='All', toSort='none') => {
  let fetched;
  if (date === 'recent') {
    fetched = await fetchRecentProducts(1, currentPagination.count, brand, 'All', toSort);
  } else {
    fetched = await fetchProducts(1, currentPagination.count, brand, date, 'All', toSort);
  }
  fetched.result = reasonableProducts(fetched.result)
  
  const totalOfReasonable = fetched.result.length;
  fetched.meta.pageCount = Math.ceil(totalOfReasonable/size);
  fetched.meta.pageSize = size;
  if (fetched.meta.pageCount<page) { page=1; }
  fetched.meta.currentPage = page;

  fetched.result = fetched.result.slice((page-1)*size,page*size);
  return fetched;
}

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  div.setAttribute("class","products");
     products
    .map(product => {
      const divprodbutton = document.createElement('div');
      const childtemplate = `
      <div class="product>
      <div  id=${product.name}>
        <span class="product_span">${product.brand}</span>
        <a target="_blank" href="${product.link}" >${product.name}</a>
        
        <span>${product.price}€ </span>
      </div>
      </div>`;
      divprodbutton.innerHTML = childtemplate;
      const button = document.createElement('button');
      button.id = product.name+"_button";
      button.setAttribute("value",product.uu);
      button.setAttribute("type","button");
      if (favoriteProducts.find( fav => fav.name==button.value )) {  
        button.innerHTML = "Removed from favorite Products";
      } 
      else {
        button.innerHTML = "Add to favorite Products";
      }
      button.addEventListener('click', async (event) => {
        if (favoriteProducts.find( fav => fav.name==button.value )) {  
          favoriteProducts.splice(favoriteProducts.indexOf(product),1);
          button.innerHTML = "Add to favorite Products";
        } else {
          favoriteProducts.push(product);
          button.innerHTML = "Removed from favorite Products"; // maybe change
        };
        }
      );
      divprodbutton.appendChild(button);
      div.appendChild(divprodbutton);

    })
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector unchanged
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector unchanged
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
  spanNbNewProducts.innerHTML = newProductsNb;
  spanp50.innerHTML = currentProducts.sort((b, a) => b.price - a.price)[Math.floor(currentProducts.length * 0.5)].price;
  spanp90.innerHTML = currentProducts.sort((b, a) => b.price - a.price)[Math.floor(currentProducts.length * 0.9)].price;
  spanp95.innerHTML = currentProducts.sort((b, a) => b.price - a.price)[Math.floor(currentProducts.length * 0.95)].price;
};

/**
 * Render brands selector
 */
const renderBrands = () => {
  let select = [];
  for(const brand of currentBrands) {
    select.push(`<option value="${brand}">${brand}</option>`);
  }

  selectBrand.innerHTML = select.join('');
}

/**
 * Render all renders
 * @param {Object} products 
 * @param {Object} pagination 
 */
const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value), selectBrand.value, currentRecent, currentReasonablePrice, selectSort.value, favorites)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectPage.addEventListener('change', async (event) => {
  fetchProducts(parseInt(event.target.value), selectShow.value, selectBrand.value, currentRecent, currentReasonablePrice, selectSort.value, favorites)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

selectBrand.addEventListener('change', async (event) => {
  fetchProducts(selectPage.value, selectShow.value, event.target.value, currentRecent, currentReasonablePrice, selectSort.value, favorites)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

inputRecent.addEventListener('change', async (event) => {
  if (event.target.checked) {
    currentRecent = event.target.value;
    fetchProducts(selectPage.value, selectShow.value, selectBrand.value, currentRecent, currentReasonablePrice, selectSort.value,favorites)
      .then(setCurrentProducts)
      .then(() => render(currentProducts, currentPagination));
  } else {
    currentRecent = 'All';
    let pagereseted = selectPage.value;
    if (selectPage.value == "") { pagereseted=1; };
    fetchProducts(pagereseted, selectShow.value, selectBrand.value, currentRecent, currentReasonablePrice, selectSort.value,favorites)
      .then(setCurrentProducts)
      .then(() => render(currentProducts, currentPagination));
  }
});

inputReasonablePrice.addEventListener('change', async (event) => {
  if (event.target.checked) {
    currentReasonablePrice = event.target.value;
    fetchProducts(selectPage.value, selectShow.value, selectBrand.value, currentRecent, event.target.value, selectSort.value,favorites)
      .then(setCurrentProducts)
      .then(() => render(currentProducts, currentPagination));
  } else {
    currentReasonablePrice = 'All';
    let pagereseted = selectPage.value;
    if (selectPage.value == "") { pagereseted=1; };
    fetchProducts(pagereseted, selectShow.value, selectBrand.value, currentRecent, currentReasonablePrice, selectSort.value,favorites)
      .then(setCurrentProducts)
      .then(() => render(currentProducts, currentPagination));
  }
});

selectSort.addEventListener('change', async (event) => {
  fetchProducts(selectPage.value, selectShow.value, selectBrand.value, currentRecent, currentReasonablePrice, event.target.value,favorites)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});
inputFavorite.addEventListener('change', async (event) => {
  if (event.target.checked) {
    favorites = event.target.value;
    fetchProducts(selectPage.value, selectShow.value, selectBrand.value, currentRecent, currentReasonablePrice, selectSort.value,event.target.value)
      .then(setCurrentProducts)
      .then(() => render(currentProducts, currentPagination));
  } else {
    favorites= 'None';
    let pagereseted = selectPage.value;
    if (selectPage.value == "") { pagereseted=1; };
    fetchProducts(pagereseted, selectShow.value, selectBrand.value, currentRecent, currentReasonablePrice, selectSort.value,favorites)
      .then(setCurrentProducts)
      .then(() => render(currentProducts, currentPagination));
  }
});


document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);

  const allProducts = await fetchProducts(1,currentPagination.count);
  const newProducts = await fetchRecentProducts(1,currentPagination.count);

  
  newProductsNb = newProducts.result.length;
  render(currentProducts, currentPagination);

  var brands=["All"]
  for (const i of Array(allProducts.result.length).keys()) {
    brands[i+1]=allProducts.result[i].brand
  }
  brands=[... new Set(brands)]
  setCurrentBrands(Array.from(brands));
  renderBrands();
});





