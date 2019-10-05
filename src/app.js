require('dotenv').config();
const express = require('express');
const knex = require('knex');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const bookmarksRouter = require('./bookmarks/bookmarks-router');

const app = express();

const morganOption = NODE_ENV === 'production';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res
      .status(401)
      .json({ error: 'Unauthorized request: invalid API token' });
  }
  next();
});

app.use(bookmarksRouter);

// eslint-disable-next-line no-unused-vars
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    //basic error on production
    response = { error: { message: 'server error' } };
  } else {
    //more complex error for development
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
