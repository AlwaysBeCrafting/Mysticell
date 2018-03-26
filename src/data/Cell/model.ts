import { Record } from "immutable";

import { Rect } from "common/types";

import { Entity } from "data/common";

interface CellProps extends Entity {
  property: string;
  node: string;
  rect: Rect;
  format: {};
}
class Cell extends Record<CellProps>({
  id: "cell.base",
  property: "template.property.base",
  node: "node.base",
  rect: new Rect(),
  format: {},
}) {}

export { Cell };
