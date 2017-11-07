import { Map, Record } from "immutable";

import { Size2d } from "common/types";

import { Cell } from "data/Cell";

import { SheetJs } from "./js";

interface SheetProps {
  id: string;
  title: string;
  size: Size2d;
  cells: Map<string, Cell>;
}
class Sheet extends Record<SheetProps>({
  id: "sheet.base",
  title: "Untitled",
  size: new Size2d(),
  cells: Map(),
}) {
  static fromJs(js: SheetJs): Sheet {
    const { id, title, size, cells } = js;
    return new Sheet({
      id,
      title,
      size: new Size2d(size.width, size.height),
      cells: Map(cells).map(Cell.fromJs),
    });
  }
}

export { Sheet };
