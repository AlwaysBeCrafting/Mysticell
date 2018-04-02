import { Record } from "immutable";

import { Rect } from "common/types";

import { Entity, TerminalReference } from "data/common";

interface CellProps extends Entity {
  property: string;
  terminal: TerminalReference;
  rect: Rect;
  format: {};
}
class Cell extends Record<CellProps>({
  id: "cell.default",
  property: "property.default",
  terminal: new TerminalReference("property.default", "+", 0),
  rect: new Rect(),
  format: {},
}) {}

export { Cell };
