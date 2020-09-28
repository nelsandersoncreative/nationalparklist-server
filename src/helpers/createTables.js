//check to see if tables exist.  create tables if they don't exist
module.exports.createTables = (db) => {
  db.schema
    .hasTable("users")
    .then(function (exists) {
      if (!exists) {
        db.schema
          .createTable("users", function (table) {
            table.increments("id").primary();
            table.string("user_name").notNullable().unique();
            table.string("user_email").notNullable().unique();
            table.string("user_password").notNullable();
            table.timestamps(true, true);
          })
          .then((success) => console.log("users table created"))
          .catch((err) => console.log("unable to create users table:", err));
      } else {
        console.log("users table exists");
      }
    })
    .then(() => {
      db.schema.hasTable("user_parks").then(function (exists) {
        if (!exists) {
          db.schema
            .createTable("user_parks", function (table) {
              table.increments("id").primary();
              table.specificType("parks", "text[]");
              table
                .integer("user_id")
                .references("id")
                .inTable("users")
                .onDelete("CASCADE")
                .notNullable();
              table.timestamps(true, true);
            })
            .then((success) => console.log("user_parks table created"))
            .catch((err) =>
              console.log("unable to create user_parks table:", err)
            );
        } else {
          console.log("user_parks table exists");
        }
      });
    });
};
