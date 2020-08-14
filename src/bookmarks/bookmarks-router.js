/* eslint-disable eqeqeq */
const express = require('express');
const bookmarksRouter = express.Router();
const store = require('../store');
const logger = require('../logger');
const { v4: uuid } = require('uuid');
const bodyParser = express.json();

bookmarksRouter.route('/bookmarks')
  .get((req, res) => {
    res
      .json(store.bookmarks);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description, rating } = req.body;
    if (!title) {
      logger.error('Title is required');
      return res.status(400).send('Invalid data');
    }
    if (!url) {
      logger.error('URL is required');
      return res.status(400).send('Invalid data');
    }
    if (!description) {
      logger.error('Description is required');
      return res.status(400).send('Invalid data');
    }
    if (!rating) {
      logger.error('Rating is required');
      return res.status(400).send('Invalid data');
    }
    const id = uuid();
    const bookmark = { id, title, url, description, rating };
    store.bookmarks.push(bookmark);
    logger.info(`Bookmark with if ${id} created`);
    res.status(201).location(`http://localhost:8000/bookmarks/${id}`).json(bookmark);

  });

bookmarksRouter
  .route('/bookmarks/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = store.bookmarks.find(book => book.id == id);
    if (!bookmark) {
      logger.error(`Bookmark with id of ${id} not found.`);
      return res
        .status(404)
        .send('Bookmark not found');
    }

    res
      .json(bookmark);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bookmarkIndex = store.bookmarks.findIndex(book => book.id == id);
    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res.status(404).send('Not found.');
    }
    store.bookmarks.splice(bookmarkIndex, 1);
    logger.info(`Bookmark with id ${id} deleted.`);
    res.status(204).end();
  });

module.exports = bookmarksRouter;
