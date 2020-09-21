# National Park List App

Create a list of National Parks you want to visit.  Explore everything each park has to offer: photos, operating hours, contact information, accessibility, activities, current weather and much more.

This is the backend for `nationalparklist`.  A live version of the app can be found at DEAD LINKS [https://](https://)

The front end client can be found at DEAD LINKS: [https://github.com/nelsandersoncreative/nationalparklist-client](https://github.com/nelsandersoncreative/nationalparklist-client).

## Introduction

If you'd like to learn more about National Parks, discover parks you hadn't heard about or just want to see what parks offer activities that you like, you have come to the right place. With this app you will be able to explore parks, save the ones you like in a list and refer to them whenever you'd like.

## Quick App Demo

// ADD imgur LINK

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


2. Create the dev and test databases: 

`createdb -U postgres -d nationalparkapp`
and 
`createdb -U postgres -d nationalparkapp-test`


3. Create a `.env` and a `.env.test` file in the project root

Inside the `.env` files you'll need the following:

````

NODE_ENV=development
PORT=8000

MIGRATION_DB_HOST=localhost
MIGRATION_DB_PORT=5432
MIGRATION_DB_NAME=nationalparkapp
MIGRATION_DB_USER=postgres
DEV_DATABASE_URL="postgresql://postgres@localhost/nationalparkapp"

JWT_SECRET=<your-secret-here>
JWT_EXPIRY='1w'

````

Your `.env.test` will be the same except your database url will be called `TEST_DATABASE_URL`. The TEST_DATABASE_URL and MIGRATION_DB_NAME will have "test" appended to it.  Here is what env.test will look like respectively:

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

4. Run the migrations for dev - `npm run migrate`
5. Run the migrations for test - `NODE_ENV=test npm run migrate`
6. Seed the database for dev

* `psql -U <db-user> -d nationalparkapp -f ./seeds/seed.sample-user.sql`
* `psql -U <db-user> -d nationalparkapp -f ./seeds/seed.sample-user-parks-list.sql`

Now, run those two seed commands above again for the test database as well.

7. Run the tests - `npm test`
8. Start the app - `npm run dev`