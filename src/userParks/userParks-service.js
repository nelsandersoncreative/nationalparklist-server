const UserParksService = {
  getUserParks(knex, user_id) {
    return knex("user_parks").select("parks").where({
      user_id: user_id,
    });
  },
  createParksList(knex, id) {
    return knex("user_parks")
      .insert({ user_id: id })
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  updateParksArray(knex, newParksArray, id) {
    return knex("user_parks")
      .where({ user_id: id })
      .update({
        parks: newParksArray,
      })
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  // getById(knex, id) {
  //   return knex.from("user_parks").select("*").where("id", id).first();
  // },
  // deletePark(knex, id) {
  //   return knex("user_parks").where({ id }).delete();
  // }
};

module.exports = UserParksService;
