# National Park List App

Create a list of National Parks you want to visit.  Explore everything each park has to offer: photos, operating hours, contact information, accessibility, activities, current weather and much more.

This is the backend for `nationalparklist`.  A live version of the app can be found at [https://nationalparklist-client.vercel.app/](https://nationalparklist-client.vercel.app/)

The front end client can be found at: [https://github.com/nelsandersoncreative/nationalparklist-client](https://github.com/nelsandersoncreative/nationalparklist-client).

## Introduction

If you'd like to learn more about National Parks, discover parks you hadn't heard about or just want to see what parks offer activities that you like, you have come to the right place. With this app you will be able to explore parks, save the ones you like in a list and refer to them whenever you'd like.

## Summary

This API handles requests made by the front end client `nationalparklist`.  It handles login requests, registration requests and requests relating to maintaining user park lists.  It stores user login and user-related park information in a PostgreSQL database.

## Screenshots

| Home       | About       | Search     | Parks       |
|------------|-------------|------------|-------------|
| <img src="/assets/home.png" width="250"> | <img src="/assets/about.png" width="250"> | <img src="/assets/search.png" width="250"> | <img src="/assets/parks.png" width="250"> |

## Technology

#### Back End

* Node and Express
  * Authentication via JWT
  * RESTful Api
* Testing
  * Supertest (integration)
  * Mocha and Chai (unit)
* Database
  * Postgres
  * Knex.js - SQL wrapper

#### Production

Deployed via Heroku


## Set up

Major dependencies for this repo include Postgres and Node.

To get setup locally, do the following:

1. Clone this repository to your machine, `cd` into the directory and run `npm install`


2. Running the app will automatically create a dev database.  The migration is handled in src > helpers > createTables.js and the migration is called in server.js.

3. Create the test database: 

`createdb -U postgres -d nationalparkapp-test`  


4. Create a `.env` and a `.env.test` file in the project root

Inside the `.env` files you'll need the following:

````

DEV_DATABASE_URL=postgresql://postgres@localhost/nationalparkdb
JWT_SECRET=secret
JWT_EXPIRY=1w
PORT=9000

````

Your `.env.test` will be slightly different.  Here is what env.test will look like:

````
NODE_ENV=test
PORT=8000

MIGRATION_DB_HOST=localhost
MIGRATION_DB_PORT=5432
MIGRATION_DB_NAME=nationalparkapp-test
MIGRATION_DB_USER=postgres
TEST_DATABASE_URL="postgresql://postgres@localhost/nationalparkapp-test"

JWT_SECRET='super-secret'
JWT_EXPIRY='1w'

````

4. Now, run these two seed scripts for the test database:

````
psql -U <db-user> -d nationalparkapp-test -f ./seeds/seed.sample-user.sql
psql -U <db-user> -d nationalparkapp-test -f ./seeds/seed.sample-user-parks-list.sql

````
7. Run the tests - `npm test`
8. Start the app - `npm run dev`


## Open Endpoints

Open endpoints require no Authentication.

* [Login](auth/login.md) : `POST /api/auth/login`
* [Register](auth/register.md) : `POST api/users/register`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* [Get user's park list](current-user/get-parks.md) : `GET /api/user-parks/:id`
* [Add park to user's park list](current-user/put-add-park.md) : `PUT api/user-parks/add-park/:id`
* [Remove park from user's park list](current-user/put-remove-park.md) : `PUT api/user-parks/remove-park/:id`
* [Delete An Account](current-user/delete.md) : `DELETE /api/auth/:id`