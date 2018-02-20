import { Record } from "immutable";

import { Rect } from "common/types";

import { CellJs } from "./js";

interface CellProps {
  id: string;
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
}) {
  static fromJs(js: CellJs): Cell {
    return new Cell({
      id: js.id,
      property: js.property,
      node: js.node,
      rect: new Rect(js.rect.left, js.rect.top, js.rect.right, js.rect.bottom),
    });
  }
}

export { Cell };
