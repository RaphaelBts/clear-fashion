const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

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
app.get('/exit', function (req,res) {
  app.listen(PORT).close();
});
app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
