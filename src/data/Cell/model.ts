import { Record } from "immutable";

import { CellJson } from "data/json";

interface CellPropertyProps {
  id: string;
  type: "input" | "output";
  index: number;
}
class CellProperty extends Record<CellPropertyProps>({
  id: "",
  type: "input",
  index: 0,
}) {
  public static fromJson(json: any) {
    return new CellProperty({
      id: json.id,
      type: json.type,
      index: json.index,
    });
  }
}

interface CellProps {
  id: string;
  property: CellProperty;
  format: {};
}
class Cell extends Record<CellProps>({
  id: "cell.00000000",
  property: new CellProperty(),
  format: {},
}) {
  public static fromJson(json: CellJson) {
    const { id, property } = json;
    return new Cell({
      id,
      property: CellProperty.fromJson(property),
    });
  }
}

export { Cell };
