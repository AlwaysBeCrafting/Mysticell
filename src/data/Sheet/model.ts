import { Record } from "immutable";

import { Size2d } from "common/types";

import { NamedEntity } from "data/common";

interface SheetProps extends NamedEntity {
  size: Size2d;
}

class Sheet extends Record<SheetProps>({
  id: "sheet.default",
  name: "Default Sheet",
  size: new Size2d(),
}) {}

export { Sheet };
