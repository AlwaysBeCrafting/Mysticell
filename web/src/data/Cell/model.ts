import { Record } from "immutable";

import { Rect } from "common/types";

import { Entity, TerminalReference } from "data/common";

class Cell
  extends Record({
    id: "cell.default",
    property: "property.default",
    terminal: new TerminalReference("property.default", "+", 0),
    rect: new Rect(),
    format: {},
  })
  implements Entity {}

export { Cell };
