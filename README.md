# Express Boilerplate

This is a boilerplate used for starting new express projects.

## TO DO

### 2019-10-05 06:19:50

- I am leaving the 'supertest' and actual endpoint tests for later, this will be the end of the Databases with Express stuff.
- The Post and Delete checkpoint will be next as well, but capstone may take priority.

## Assignment Notes

1. Make two new databases, bookmarks and bookmarks-test.
2. Write the first migration inside the bookmarks-server project that creates the table for bookmarks. Then use the migration to create the tables in both new databases.
    - Create /migrations directory
    - Create databases via createdb, include in .env (DB_URL, TEST_DB_URL)
    - Create 001.do.create_bookmarks_table.sql as first migration
    - npm i postgrator
    - Create postgator-config.js with case for test server in connection string.
    - Add migrate to package.json scripts.
3. The table should contain fields for id, title, url, description and rating
4. The description is the only optional field
5. Choose suitable data types for each column
6. Refactor the GET /bookmarks endpoint and tests. The endpoint should use the database tables.
    -npm i knex
7. You'll need to wire up Knex into your server and tests.
8. Write a BookmarksService object in the bookmarks-server project that will support CRUD for bookmarks using Knex.
9. You should use fixtures in your tests for the GET /bookmarks and GET /bookmarks/:bookmark_id
10. Write tests for how each endpoint behaves when the database is empty
11. Write seeding scripts to insert dummy bookmarks into the database tables so you can check that the refactored endpoints work when your server is 12. running locally.

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

## Postmortem


### 2019-10-05 06:19:06
The best thing to do first is sketch out the architecture and ensure all your files/directories are put together. Consider the structures for testing, fixtures, any new directories to hold the app itself, seeding, databases, etc.

`require('dotenv').config` is required anywhere you use environmental variables, including `setup.js`.

I used the sql from the prior assignment to create the migrations, and had to reconfigure them to accept UUIDs as primary keys with an extension. I made sure to define the primary key properly, and hit some problems making the keys match the table structure. Ideally, I should have added migrations instead of reconfiguring the first to better show my process - I wasn't using it as intended, but it's hard to say what would have been faster. I also hit a major problem exporting the bookmarks-service object properly. For some reason, I keep wrapping exports in object unnecessarily - a holdover from React?...

The controller in this app is 'app.js' because it is the file that starts the server. The controller should connect to the knex instance via `app.set('db', db)` in the server.js, which injects! In turn, you can get 'db' from the server in app by using `req.app.get('db)` in any given endpoint.

I have now parsed out the services tests from the endpoints tests, and fixed the forgotten case where there are no items in database.

I am leaving the 'supertest' and actual endpoint tests for later.
