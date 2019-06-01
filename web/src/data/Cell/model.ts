import { Record } from "immutable";

import { Rect } from "~/common/types";

import { Entity } from "~/data/common";

/**
 * A region of a sheet referencing a property terminal
 */
class Cell
  extends Record({
    id: "cell.default",
    sheetId: "sheet.default",
    property: "property.default",
    fieldId: "field.default",
    sign: "+" as "+" | "-",
    index: 0,
    rect: new Rect(),
    format: {},
  })
  implements Entity {}

export { Cell };
