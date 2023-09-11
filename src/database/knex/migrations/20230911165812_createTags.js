
exports.up = function(knex) {
  knex.schema.createTable("movies", table => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");
    table.integer("movie_id").references("id").inTable("movies").onDelete("CASCADE");
    table.text("name").notNullable();
  })
};


exports.down = function(knex) {
  knex.schema.dropTable("movies")
};
