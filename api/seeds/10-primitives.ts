import * as Knex from "knex";

exports.seed = async function(knex: Knex) {
  const primitives = [
    { type: "primitive", id: "[add]", path: "/Math/Add" },
    { type: "primitive", id: "[sub]", path: "/Math/Subtract" },
    { type: "primitive", id: "[mul]", path: "/Math/Multiply" },
    { type: "primitive", id: "[div]", path: "/Math/Divide" },
    { type: "primitive", id: "[cei]", path: "/Math/Ceiling" },
    { type: "primitive", id: "[flr]", path: "/Math/Floor" },
  ];

  await Promise.all(primitives.map(p => knex("sources").insert(p)));
};
