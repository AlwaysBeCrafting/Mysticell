import * as Knex from "knex";

exports.seed = async function(knex: Knex) {
  const document = {
    id: "mrXRm8gYI",
    name: "Example Document",
    version: 0,
  };
  await knex("documents").insert(document);

  const func = {
    id: "3rX3ND6f9M",
    document_id: document.id,
    path: "/Ability Modifier",
    type: "function",
  };
  await knex("sources").insert(func);

  const field = {
    id: "dWQED_N66t",
    document_id: document.id,
    path: "/Str",
    type: "field",
  };
  await knex("sources").insert(field);

  const fieldValues = [
    {
      source_id: field.id,
      source_type: "field",
      index: 0,
      value: 12,
    },
  ];
  await Promise.all(fieldValues.map(fv => knex("field_values").insert(fv)));

  const formulas = [
    {
      id: func.id,
      source_type: "function",
    },
    {
      id: field.id,
      source_type: "field",
    },
  ];
  await Promise.all(formulas.map(f => knex("formulas").insert(f)));

  const sheets = [
    {
      id: "WlJskqXsw9",
      document_id: document.id,
      name: "Example sheet",
      width: 12,
      height: 20,
    },
  ];
  await Promise.all(sheets.map(s => knex("sheets").insert(s)));

  const cells = [
    {
      id: "rJgwSdam1B",
      sheet_id: sheets[0].id,
      field_id: field.id,
      sign: "+",
      index: 0,
    },
  ];
  await Promise.all(cells.map(c => knex("cells").insert(c)));
};
