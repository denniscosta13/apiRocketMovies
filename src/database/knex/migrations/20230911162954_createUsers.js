
exports.up = function(knex) {
  knex.schema.createTable("users", table => {
    table.increments("id");
    table.text("name").notNullable();
    table.text("email").notNullable();
    table.text("password").notNullable();
    table.text("avatar");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  })
};


exports.down = function(knex) {
  knex.schema.dropTable("users")
};
