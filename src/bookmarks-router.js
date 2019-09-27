const express = require('express');
const logger = require('./logger');
const bookmarks = require('./store');
const uuid = require('uuid');

const bookmarksRouter = express.Router();

bookmarksRouter
  .get('/', (req, res) => {
    res.send('Server running on port 8000! Good luck.');
  })

  .get('/bookmarks', (req, res) => {
    res.send(bookmarks);
  })

  .get('/bookmarks/:id', (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line eqeqeq
    const bookmark = bookmarks.find(b => b.id == id);

    if (!bookmark) {
      logger.error(`Bookmark with id ${bookmark} not found!`);
      return res.status(404).send("This bookmark doesn't exist!");
    }

    res.json(bookmark);
  })

  .post('/bookmarks', (req, res) => {
    const { title, link, desc = '', rating = '-1' } = req.body;

    if (!title || !link) {
      logger.error('Both a link and title are required.');
      return res.status(404).send('Invalid data');
    }

    const id = uuid();
    const bookmark = {
      id,
      title,
      link,
      desc,
      rating
    };
    bookmarks.push(bookmark);
    logger.info(`Bookmark for '${title}' created, id: ${id}`);
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);
  })
  .delete('/bookmarks/:id', (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line eqeqeq
    const bookmarksInd = bookmarks.findIndex(bm => bm.id == id);

    if (bookmarksInd === -1) {
      logger.error(`This bookmark (${id}) wasn't found`);
      res.status(404).send('Bookmark not found');
    }

    bookmarks.splice(bookmarksInd, 1);

    logger.info(`Bookmark of ${id} deleted`);

    res.status(204).end();
  });

module.exports = bookmarksRouter;
