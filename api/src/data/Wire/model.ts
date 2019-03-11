import { Model } from "objection";

import { Formula } from "../Formula/model";

class Wire extends Model {
  static tableName = "wires";
  static relationMappings = {
    formula: {
      relation: Model.BelongsToOneRelation,
      modelClass: Formula,
      join: {
        from: "wires.formulaId",
        to: "formulas.id",
      },
    },
  };
}

export { Wire };
