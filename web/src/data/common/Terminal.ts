import { ValueObject } from "immutable";

import { hashAll } from "common/utils";

import { ParamType } from ".";

interface Terminal {
  name: string;
  type: ParamType;
}

class TerminalPointer implements ValueObject {
  constructor(readonly node_id: string | null, readonly index: number) {}

  hashCode() {
    return hashAll(this.node_id, this.index);
  }

  equals(other: any) {
    return this.node_id === other.id && this.index === other.index;
  }
}

export { Terminal, TerminalPointer };
