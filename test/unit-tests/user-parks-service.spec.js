require("../setup");
const helpers = require("../test-helpers");
const UserParksService = require("../../src/userParks/userParks-service");
const knex = require("knex");

// Generate database/table data for testing User Parks service functions
describe("UserParksService", () => {
  let db;
  const testUsers = helpers.testUsers();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
  });

  before("clean db", () => helpers.cleanTables(db));
  after("close db", () => db.destroy());

  beforeEach("create users", () => helpers.createUsers(db, testUsers));
  afterEach("clean db", () => helpers.cleanTables(db));

  describe("findCurrentByUserId", () => {
    
    // 1. when no parks list exists for a user --> it should return an array with a length of 0
    context("when no parks exist for a user", () => {
      it("returns an array with a length of zero", async () => {
        const user_id = 1;
        const parks = await UserParksService.getUserParks(db, user_id);
        // eslint-disable-next-line no-unused-expressions
        expect(parks.length).to.be.equal(0);
      });
    });

    // 2. when a user park list exists --> returns { parks: [] }
    context("when a user parkslist exists", () => {
      it("returns an array with a length > 0", async () => {
        const user_id = 1;
        let newParksArray = ["parkCode"];
        await UserParksService.createParksList(db, user_id);
        const addPark = await UserParksService.updateParksArray(
          db,
          newParksArray,
          user_id
        );
        // eslint-disable-next-line no-unused-expressions
        const updatedArray = await UserParksService.getUserParks(db, user_id);
        expect(updatedArray[0].parks.length > 0).to.be.true;
      });
    });
  });
});
