const express = require('express');
const logger = require('../logger');
const uuid = require('uuid');

const bookmarksRouter = express.Router();
const BookmarksService = require('./bookmarks-service');

bookmarksRouter

  .get('/bookmarks', (req, res, next) => {
    return BookmarksService.getAllBookmarks(req.app.get('db'))
      .then(bookmarks => {
        res.json(bookmarks);
      })
      .catch(next);
  })

  .get('/bookmarks/:id', (req, res, next) => {
    const { id } = req.params;
    // eslint-disable-next-line eqeqeq
    return BookmarksService.getById(req.app.get('db'), id)
      .then(bookmark => {
        if (!bookmark) {
          logger.error(`Bookmark with id ${bookmark} not found!`);
          return res.status(404).json({
            error: { message: 'Bookmark does not exist!' }
          });
        }
        res.json(bookmark);
      }
      )
      .catch(next);
  });

  // .post('/bookmarks', (req, res) => {
  //   const { title, link, desc = '', rating = '-1' } = req.body;

  //   if (!title || !link) {
  //     logger.error('Both a link and title are required.');
  //     return res.status(404).send('Invalid data');
  //   }

  //   const id = uuid();
  //   const bookmark = {
  //     id,
  //     title,
  //     link,
  //     desc,
  //     rating
  //   };
  //   bookmarks.push(bookmark);
  //   logger.info(`Bookmark for '${title}' created, id: ${id}`);
  //   res
  //     .status(201)
  //     .location(`http://localhost:8000/bookmarks/${id}`)
  //     .json(bookmark);
  // })
  // .delete('/bookmarks/:id', (req, res) => {
  //   const { id } = req.params;
  //   // eslint-disable-next-line eqeqeq
  //   const bookmarksInd = bookmarks.findIndex(bm => bm.id == id);

  //   if (bookmarksInd === -1) {
  //     logger.error(`This bookmark (${id}) wasn't found`);
  //     res.status(404).send('Bookmark not found');
  //   }

  //   bookmarks.splice(bookmarksInd, 1);

  //   logger.info(`Bookmark of id:${id} deleted`);

  //   res.status(204).end();
  // });

module.exports = bookmarksRouter;
