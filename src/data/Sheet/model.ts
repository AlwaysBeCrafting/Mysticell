import { Map, Record } from "immutable";

import { Size2d } from "common/types";

import { Cell } from "data/Cell";
import { NamedEntity } from "data/common";

interface SheetProps extends NamedEntity {
  size: Size2d;
  cells: Map<string, Cell>;
}
class Sheet extends Record<SheetProps>({
  id: "sheet.base",
  name: "Untitled",
  size: new Size2d(),
  cells: Map(),
}) {}

export { Sheet };
