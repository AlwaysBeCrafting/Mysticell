import * as Knex from "knex";

exports.seed = async function(knex: Knex) {
  await knex("documents").del();
  return knex("documents").insert([
    {
      id: "d0259516-61e2-467b-83fc-a88408dd68a9",
      name: "Example Document",
      version: 0,
    },
  ]);
};
