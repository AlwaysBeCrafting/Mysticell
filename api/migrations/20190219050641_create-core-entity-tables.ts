import * as Knex from "knex";

const SHORTID_MAX_LENGTH = 14;
const PATH_MAX_LENGTH = 8192;

exports.up = async function(knex: Knex): Promise<any> {
  await knex.schema.createTable("documents", table => {
    table.string("id", SHORTID_MAX_LENGTH).primary();
    table.text("name");
    table.integer("version").defaultTo(0);
  });

  await knex.schema.createTable("sources", table => {
    table.string("id", SHORTID_MAX_LENGTH).primary();
    table.string("document_id", SHORTID_MAX_LENGTH).references("documents.id");
    table
      .string("path", PATH_MAX_LENGTH)
      .unique()
      .notNullable();
    table.enum("type", ["function", "field", "primitive"]).notNullable();
    table.unique(["id", "type"]);
  });

  await knex.schema.createTable("field_values", table => {
    table.string("source_id", SHORTID_MAX_LENGTH);
    table.enum("source_type", ["field"]);
    table.integer("index");
    table.string("value");
    table.primary(["source_id", "index"]);
    table
      .foreign(["source_id", "source_type"])
      .references(["id", "type"])
      .inTable("sources");
  });

  await knex.schema.createTable("formulas", table => {
    table.string("id", SHORTID_MAX_LENGTH).primary();
    table.enum("source_type", ["function", "field"]);
    table
      .foreign(["id", "source_type"])
      .references(["id", "type"])
      .inTable("sources");
  });

  await knex.schema.createTable("nodes", table => {
    table.string("id", SHORTID_MAX_LENGTH).primary();
    table
      .string("formula_id", SHORTID_MAX_LENGTH)
      .references("formulas.id")
      .notNullable();
    table.string("label", 255).notNullable();
    table
      .integer("x")
      .defaultTo(0)
      .notNullable();
    table
      .integer("y")
      .defaultTo(0)
      .notNullable();
  });

  await knex.schema.createTable("node_values", table => {
    table
      .string("node_id")
      .references("nodes.id")
      .notNullable();
    table.integer("index").notNullable();
    table.string("value", 255);
    table.primary(["node_id", "index"]);
  });

  await knex.schema.createTable("wires", table => {
    table.string("id", SHORTID_MAX_LENGTH).primary();
    table
      .string("formula_id", SHORTID_MAX_LENGTH)
      .references("formulas.id")
      .notNullable();
    table.string("tail_id", SHORTID_MAX_LENGTH).references("nodes.id");
    table.integer("tail_index");
    table.string("head_id", SHORTID_MAX_LENGTH).references("nodes.id");
    table.integer("head_index");
    table.unique(["head_id", "head_index"]);
  });

  await knex.schema.createTable("sheets", table => {
    table.string("id", SHORTID_MAX_LENGTH).primary();
    table.string("name", 255).notNullable();
    table.integer("width");
    table.integer("height");
  });

  await knex.schema.createTable("cells", table => {
    table.string("id", SHORTID_MAX_LENGTH).primary();
    table
      .string("field_id")
      .references("sources.id")
      .notNullable();
    table.enum("sign", ["+", "-"]);
    table.integer("index");
  });
};

exports.down = async function(knex: Knex): Promise<any> {
  await knex.schema.dropTable("cells");
  await knex.schema.dropTable("sheets");
  await knex.schema.dropTable("wires");
  await knex.schema.dropTable("node_values");
  await knex.schema.dropTable("nodes");
  await knex.schema.dropTable("formulas");
  await knex.schema.dropTable("field_values");
  await knex.schema.dropTable("sources");
  await knex.schema.dropTable("documents");
};
