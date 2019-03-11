import { Model } from "objection";

import { Sheet } from "../Sheet/model";
import { Source } from "../Source/model";

class Document extends Model {
  static tableName = "documents";
  static relationMappings = {
    sheets: {
      relation: Model.HasManyRelation,
      modelClass: Sheet,
      join: {
        from: "sheets.documentId",
        to: "documents.id",
      },
    },
    sources: {
      relation: Model.HasManyRelation,
      modelClass: Source,
      join: {
        from: "sources.documentId",
        to: "documents.id",
      },
    },
  };
}

export { Document };
