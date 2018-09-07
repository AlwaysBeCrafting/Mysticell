import { Record, Repeat, Seq } from "immutable";

import { Entity } from "data/common";

interface RowProps extends Entity {
  values: Seq.Indexed<any>;
}

const err = new Error("missing row");
err.name = "REF";

class Row extends Record<RowProps>({
  id: "row.default",
  values: Repeat(err),
}) {}

export { Row };
