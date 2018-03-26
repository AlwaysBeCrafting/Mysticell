import { List } from "immutable";

import { ValueParamType } from "data/common";

interface Pin {
  name: string;
  type: ValueParamType | "undefined";
}

type PinGroup = List<Pin>;

export { Pin, PinGroup };
