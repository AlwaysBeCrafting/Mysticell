import { List, Record } from "immutable";

import { ValueParamType } from "data/common";

import { NodeSourceProps } from "../common";

interface TableCardSourceProps extends NodeSourceProps {
  outputTypes: List<ValueParamType>;
  rows: List<any>;
}

class TableCardSource extends Record<TableCardSourceProps>({
  id: "cardSource.table.default",
  name: "Default Table",
  inputNames: List.of("Row"),
  inputTypes: List.of("number") as List<ValueParamType>,
  outputNames: List.of("Column 1"),
  outputTypes: List.of("string") as List<ValueParamType>,
  rows: List(),
}) {}

export { TableCardSource };
