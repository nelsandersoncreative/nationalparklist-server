/* globals supertest */
const knex = require("knex");
const app = require("../../src/app");
const helpers = require("./../test-helpers");

// generate database/table data for protected enpdpoints
describe("Protected Endpoints", function () {
  let db;
  let testUsers = helpers.testUsers();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  before("cleanup", () => helpers.cleanTables(db));
  afterEach("cleanup", () => helpers.cleanTables(db));

  beforeEach("seed users", () => helpers.createUsers(db, testUsers));

  // test each protected endpoint relating to unique user park data
  // getting user parklist & adding/deleting parks from user parklist
  const protectedEndpoints = [
    {
      name: "GET /api/user-parks/:user_id",
      path: "/api/user-parks/1",
      method: supertest(app).get,
    },
    {
      name: "PUT /api/user-parks/add-park/:park",
      path: "/api/user-parks/add-park/fopo",
      method: supertest(app).put,
    },
    {
      name: "PUT /api/user-parks/remove-park/:park",
      path: "/api/user-parks/remove-park/fopo",
      method: supertest(app).put,
    },
  ];

  protectedEndpoints.forEach((endpoint) => {
    describe(endpoint.name, () => {

      // if there is no bearer token --> throw an error
      it('returns 401 "Missing bearer token" if no token provided', () => {
        return endpoint
          .method(endpoint.path)
          .expect(401, { message: "Missing bearer token" });
      });

      // if there is an invalid token --> throw an error
      it('returns 401 "Unauthorized request" when invalid JWT secret', () => {
        return endpoint
          .method(endpoint.path)
          .set(
            "Authorization",
            helpers.createAuthToken(testUsers[0], "badSecret")
          )
          .expect(401, { message: "Unauthorized request" });
      });

      // if there is an invalid email --> throw an error
      it('returns 401 "Unauthorized request" when invalid email', async () => {
        const invalidUser = await helpers.findByEmail(
          db,
          testUsers[0].user_email
        );
        invalidUser.user_email = "fake@fake.fake";

        return endpoint
          .method(endpoint.path)
          .set("Authorization", helpers.createAuthToken(invalidUser))
          .expect(401, { message: "Unauthorized request" });
      });
    });
  });
});
