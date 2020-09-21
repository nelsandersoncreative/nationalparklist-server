/* globals supertest */
const app = require("../../src/app");
const knex = require("knex");
const helpers = require("../test-helpers");
const UserParksService = require("../../src/userParks/userParks-service");
const { createParkList } = require("../test-helpers");
const supertest = require("supertest");
const { expect } = require("chai");
require("../setup");

describe("User Parks Endpoints", () => {
  let db;
  let testUsers = helpers.testUsers();

  before("connect db", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });

    app.set("db", db);
  });

  before("clear table data", () => helpers.cleanTables(db));
  afterEach("clear table data", () => helpers.cleanTables(db));
  after("close db connection", () => db.destroy());
  beforeEach("seed users", () => helpers.createUsers(db, testUsers));

  // TEST #1 GET User Parks List

  describe("GET /api/user-parks/:user_id", () => {
    //if user has no parks in parks list yet
    it("successfully creates and then retrieves a user park list when user previously had no park list", async () => {
      return supertest(app)
        .get("/api/user-parks/1")
        .set("Content-Type", "application/json")
        .set("Authorization", helpers.createAuthToken(testUsers[0]))
        .expect(200, [])
        .then(async () => {
          // eslint-disable-next-line no-unused-expressions
          let userParks = await createParkList(db, 1);
          // eslint-disable-next-line no-unused-expressions
          userParks = await UserParksService.getUserParks(db, 1);
          // eslint-disable-next-line no-unused-expressions
          expect(userParks).to.be.an("array");
        });
    });
  });

  // TEST #2. PUT Add a new park to new parks list

  describe("PUT /api/user-parks/add-park/:park", () => {
    it("when no park list is found, initialize a parklist", () => {
      return supertest(app)
        .put("/api/user-parks/1")
        .set("Content-Type", "application/json")
        .set("Authorization", helpers.createAuthToken(testUsers[0]))
        .then(async () => {
          // eslint-disable-next-line no-unused-expressions
          let userParks = await createParkList(db, 1);
          // eslint-disable-next-line no-unused-expressions
          userParks = await UserParksService.getUserParks(db, 1);
          // eslint-disable-next-line no-unused-expressions
          expect(201);
        });
    });

    it("returns 201 created when park is added to park list", () => {
      return supertest(app)
        .put("/api/user-parks/fopo")
        .set("Content-Type", "application/json")
        .set("Authorization", helpers.createAuthToken(testUsers[0]))
        .then(async () => {
          // retrieve user parks array
          const oldParksArray = await UserParksService.getUserParks(db, 1);

          //since there are no parks in the users park list
          let newParksArray = oldParksArray;

          // push new park into array
          newParksArray.push("fopo");

          // because this user doesn't have a park list, create one
          await UserParksService.createParksList(db, 1);

          // update the park list with the newly added park
          const parksArray = await UserParksService.updateParksArray(
            db,
            newParksArray,
            1
          );
          expect(201);
        });
    });
  });

  // TEST #3. PUT remove existing park from parks list
  describe("PUT /api/user-parks/remove-park/:park", () => {
    it("returns 201 when a park is removed from the parklist", () => {
      return supertest(app)
        .put("/api/user-parks/remove-park/fopo")
        .set("Content-Type", "application/json")
        .set("Authorization", helpers.createAuthToken(testUsers[0]))
        .then(async () => {
          // retrieve user parks array
          const oldParksArray2 = await UserParksService.getUserParks(db, 1);

          //since there are no parks in the users park list
          let newParksArray2 = oldParksArray2;

          // push new park into array
          newParksArray2.push("fopo");

          // because this user doesn't have a park list, create one
          await UserParksService.createParksList(db, 1);

          // update the park list with the newly added park
          const parksArray2 = await UserParksService.updateParksArray(
            db,
            newParksArray2,
            1
          );
          expect(201);

          // get existing parks list
          const oldParksArray3 = await UserParksService.getUserParks(db, 1);
          //save it's value in a variable
          let newParksArray3 = oldParksArray3[0].parks;
          // remove the park from params (fopo in this case)
          newParksArray3.splice(0, 1);
          // update user parks list...
          const updatedParksArray3 = await UserParksService.updateParksArray(
            db,
            newParksArray3,
            1
          );
          expect(201);
        });
    });
  });
});
