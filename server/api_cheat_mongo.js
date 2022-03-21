const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
var axios = require('axios');

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

app.get('/products/search', async function (req, res) {

  let params = req.query;
  let limit = null;

  console.log(req.query);

  if (params.hasOwnProperty("limit")) {
    limit = params.limit;
    delete params.limit;
    
  }
  if (params.hasOwnProperty("size")) {
    size = parseInt(params.size);
    delete params.size;
  }
  if (params.hasOwnProperty("page")) {
    page = parseInt(params.page);
    delete params.page;
  }

  var data = {
      "collection": "products",
      "database": "clear-fashion",
      "dataSource": "Cluster0",
      "filter": params,
  };

  if (limit!=null) {
    data.limit = parseInt(limit);
  }

  data = JSON.stringify(data);

  console.log(data);

  var config = {
      method: 'post',
      url: 'https://data.mongodb-api.com/app/data-hlzmy/endpoint/data/beta/action/find',
      headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': 'oP1FUCgE3AEv28LiqZunoAmAknGR8U0a4Jr4Wuqg17TrhkbtPDUWGwJPHaCM0y6M'
      },
      data : data
  };

  let response;

  await axios(config)
      .then(function (req) {
          response = JSON.stringify(req.data);
      })
      .catch(function (error) {
          console.log(error);
          response = error;
      });

  res.send(response);
});
app.get('/exit', function (req,res) {
  app.listen(PORT).close();
});
app.listen(PORT, ()=> {
  console.log(`📡 Running on port ${PORT}`)});
