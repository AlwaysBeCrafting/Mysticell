import { Record } from "immutable";

import { Size2d } from "common/types";

import { Entity } from "data/common";

interface SheetProps extends Entity {
  name: string;
  size: Size2d;
}

class Sheet extends Record<SheetProps>({
  id: "sheet.default",
  name: "Default Sheet",
  size: new Size2d(),
}) {}

export { Sheet };
