import { ValueObject } from "immutable";

import { hashAll } from "common/utils";

import { ParamType } from ".";

interface Terminal {
  name: string;
  type: ParamType;
}

class TerminalPointer implements ValueObject {
  constructor(readonly nodeId: string, readonly index: number) {}

  hashCode() {
    return hashAll(this.nodeId, this.index);
  }

  equals(other: any) {
    return this.nodeId === other.id && this.index === other.index;
  }
}

export { Terminal, TerminalPointer };
