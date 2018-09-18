import { ValueObject } from "immutable";

import { hashAll } from "common/utils";

import { ParamType } from ".";

interface TerminalDescription {
  name: string;
  type: ParamType;
}

class TerminalReference<S extends "+" | "-" = "+" | "-">
  implements ValueObject {
  constructor(readonly id: string, readonly sign: S, readonly index: number) {}

  hashCode() {
    return hashAll(this.id, this.sign, this.index);
  }

  equals(other: any) {
    return (
      this.id === other.id &&
      this.sign === other.sign &&
      this.index === other.index
    );
  }
}

export { TerminalDescription, TerminalReference };
