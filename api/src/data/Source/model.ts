import { Model } from "objection";

import { Document } from "../Document/model";
import { Formula } from "../Formula/model";

class Source extends Model {
  static tableName = "sources";
  static relationMappings = {
    document: {
      relation: Model.BelongsToOneRelation,
      modelClass: Document,
      join: {
        from: "sources.documentId",
        to: "documents.id",
      },
    },
    formula: {
      relation: Model.HasOneRelation,
      modelClass: Formula,
      join: {
        from: "formulas.sourceId",
        to: "sources.id",
      },
    },
  };
}

export { Source };
