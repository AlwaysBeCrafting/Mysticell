import * as Knex from "knex";

exports.seed = async function(knex: Knex) {
  const tableNames = [
    "cells",
    "sheets",
    "terminals",
    "node_values",
    "nodes",
    "wires",
    "formulas",
    "field_values",
    "sources",
    "documents",
  ];
  return Promise.all(tableNames.map(name => knex(name).del()));
};
