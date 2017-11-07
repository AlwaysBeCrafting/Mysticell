import { List, Record } from "immutable";

import { CardTemplate, CardTemplateProps } from "../model";

import { TableCardTemplateJs } from "./js";

interface TableCardTemplateProps extends CardTemplateProps {
  rows: List<any>;
}
class TableCardTemplate extends Record<TableCardTemplateProps>({
  id: "template.table.00000000",
  name: "Table",
  inputNames: List(["Row"]),
  outputNames: List(),
  rows: List(),
}) {
  static fromJs(js: TableCardTemplateJs) {
    return new TableCardTemplate({
      id: js.id,
      name: js.name,
      outputNames: List(js.outputNames),
      rows: List(js.rows),
    });
  }
}
const isTable = (
  template: CardTemplate | undefined,
): template is TableCardTemplate =>
  !!template && template.id.startsWith("template.table");

export { TableCardTemplate, isTable };
