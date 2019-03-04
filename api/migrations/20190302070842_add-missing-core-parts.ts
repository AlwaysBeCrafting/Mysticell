import * as Knex from "knex";

const SHORTID_MAX_LENGTH = 14;

exports.up = async function(knex: Knex) {
  await knex.schema.alterTable("nodes", table => {
    table.string("source_id", SHORTID_MAX_LENGTH).references("sources.id");
  });

  await knex.schema.alterTable("sheets", table => {
    table.string("document_id", SHORTID_MAX_LENGTH).references("documents.id");
  });

  return knex.schema.createTable("terminals", table => {
    table.string("formula_id", SHORTID_MAX_LENGTH).references("formulas.id");
    table.enum("sign", ["+", "-"]);
    table.integer("index");
    table.string("label", 255);
    table.primary(["formula_id", "sign", "index"]);
  });
};

exports.down = async function(knex: Knex) {
  await knex.schema.alterTable("nodes", table => {
    table.dropColumn("source_id");
  });
  await knex.schema.alterTable("sheets", table => {
    table.dropColumn("document_id");
  });

  return knex.schema.dropTable("terminals");
};
