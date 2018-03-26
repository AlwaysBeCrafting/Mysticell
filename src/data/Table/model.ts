import { List, Record } from "immutable";

import { NodeSource, ValueParamType } from "data/common";

interface TableCardSourceProps extends NodeSource {
  rows: List<any>;
}

class TableCardSource extends Record<TableCardSourceProps>({
  id: "cardSource.table.default",
  name: "Default Table",
  inputPins: List.of({ name: "Row", type: "number" as ValueParamType }),
  outputPins: List.of({ name: "Column 1", type: "string" as ValueParamType }),
  rows: List(),
}) {}

export { TableCardSource };
