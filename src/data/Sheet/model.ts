import { Map, Record } from "immutable";

import { Rect2d, Size2d } from "common/types";

import { Cell } from "data/Cell";
import { SheetJson } from "data/json";

interface SheetProps {
  id: string;
  title: string;
  size: Size2d;
  cells: Map<string, Cell>;
  layout: Map<string, Rect2d>;
}
class Sheet extends Record<SheetProps>({
  id: "sheet.00000000",
  title: "Untitled",
  size: new Size2d(),
  cells: Map(),
  layout: Map(),
}) {
  public static fromJson(json: SheetJson) {
    const { id, title, size, cells, layout } = json;
    return new Sheet({
      id,
      title,
      size: new Size2d(size),
      cells: Map(cells).map(Cell.fromJson),
      layout: Map(layout).map(pos => new Rect2d(pos)),
    });
  }
}

export { Sheet };
