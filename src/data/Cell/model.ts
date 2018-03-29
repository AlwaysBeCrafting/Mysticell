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
  terminal: { id: "property.default", sign: "+", index: 0 },
  rect: new Rect(),
  format: {},
}) {}

export { Cell };
