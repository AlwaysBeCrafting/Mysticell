import { Model } from "objection";

import { Source } from "../Source/model";
import { Node } from "../Node/model";
import { Wire } from "../Wire/model";

class Formula extends Model {
  static tableName = "formulas";
  static relationMappings = {
    source: {
      relation: Model.BelongsToOneRelation,
      modelClass: Source,
      join: {
        from: "formulas.sourceId",
        to: "sources.id",
      },
    },
    nodes: {
      relation: Model.HasManyRelation,
      modelClass: Node,
      join: {
        from: "nodes.formulaId",
        to: "formulas.id",
      },
    },
    wires: {
      relation: Model.HasManyRelation,
      modelClass: Wire,
      join: {
        from: "wires.formulaId",
        to: "formulas.id",
      },
    },
  };
}

export { Formula };
