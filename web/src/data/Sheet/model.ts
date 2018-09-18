import { Record } from "immutable";

import { Size2d } from "common/types";

import { Entity } from "data/common";

class Sheet
  extends Record({
    id: "sheet.default",
    name: "Default Sheet",
    size: new Size2d(),
  })
  implements Entity {}

export { Sheet };
