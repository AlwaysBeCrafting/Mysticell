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
    return new Cell(js);
  }
}

export { Cell };
