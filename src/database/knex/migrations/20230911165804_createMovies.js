
exports.up = function(knex) {
  knex.schema.createTable("movies", table => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("description");
    table.integer("rating");
    table.integer("user_id").references("id").inTable("users");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  })
};


exports.down = function(knex) {
  knex.schema.dropTable("movies")
};
