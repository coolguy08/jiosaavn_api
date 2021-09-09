const express = require('express');
const helmet=require('helmet');
const cors = require('cors');
const compression=require('compression');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(compression());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Musico API'
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
