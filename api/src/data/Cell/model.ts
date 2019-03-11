import { Model } from "objection";

import { Sheet } from "../Sheet/model";
import { Source } from "../Source/model";

class Cell extends Model {
  static tableName = "cells";

  static relationMappings = {
    sheet: {
      relation: Model.BelongsToOneRelation,
      modelClass: Sheet,
      join: {
        from: "cells.sheetId",
        to: "sheets.id",
      },
    },
    source: {
      relation: Model.BelongsToOneRelation,
      modelClass: Source,
      join: {
        from: "cells.sourceId",
        to: "sources.id",
      },
    },
  };
}

export { Cell };
