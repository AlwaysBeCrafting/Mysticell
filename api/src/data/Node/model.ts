import { Model } from "objection";

import { Formula } from "../Formula/model";

class Node extends Model {
  static tableName = "nodes";
  static relationMappings = {
    source: {
      relation: Model.HasOneRelation,
      modelClass: Formula,
      join: {
        from: "formula.sourceId",
        to: "sources.id",
      },
    },
  };
}

export { Node };
