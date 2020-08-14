require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const bookmarksRouter = require('./bookmarks/bookmarks-router');
const errorHandler = require('./error-handler');
const validateBearerToken = require('./validateBearerToken');

const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common'));
app.use(cors());
app.use(helmet());
app.use(validateBearerToken);

app.use(bookmarksRouter);

app.get('/', (req, res) => {
  res.send('Nothing to see here, move along to endpoint /bookmarks');
});

app.use(errorHandler);
module.exports = app;
