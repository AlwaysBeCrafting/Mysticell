import * as Knex from "knex";

exports.up = async function(knex: Knex) {
  await knex.schema.createTable("documents", table => {
    table.uuid("id").primary();
    table.text("name");
    table.integer("version").defaultTo(0);
  });
};

exports.down = async function(knex: Knex) {
  await knex.schema.dropTable("documents");
};
