const knex = require('knex');
const BookmarksService = require('../src/bookmarks/bookmarks-service');
const { makeBookmarksArray } = require('./bookmarks.fixtures');

describe('Bookmarks Endpoints', () => {
  let db;
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
  });

  before(() => {
    return db('bookmarks').truncate();
  });

  after(() => {
    return db.destroy();
  });

  context('Database loads with items in table', function() {
    const testBookmarks = makeBookmarksArray();
    beforeEach(() => {
      return db.into('bookmarks').insert(testBookmarks);
    });
    afterEach(() => {
      return db('bookmarks').truncate();
    });

    it('getAllBookmarks() resolves all bookmarks from table', () => {
      return BookmarksService.getAllBookmarks(db).then(actual => {
        expect(actual).to.eql(testBookmarks);
      });
    });

    it('getById() returns a single bookmark by id.', () => {
      const testBookmark = testBookmarks[1];
      const testId = testBookmark.id;

      return BookmarksService.getById(db, testId)
        .then(actual => {
          expect(actual).to.eql(testBookmark);
        });
    });
  });

  context('Database loads without items in table', () => {});
});
