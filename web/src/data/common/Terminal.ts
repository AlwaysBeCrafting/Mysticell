import { ValueObject } from "immutable";

import { Position2d } from "common/types";
import { hashAll } from "common/utils";

import { Node } from "data/Node";
import { Source } from "data/Source";

import { EntityTable, JoinManyToOne, ParamType } from ".";

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

const terminalPosition = (
  nodes: EntityTable<Node>,
  sources: EntityTable<Source>,
  nodeSources: JoinManyToOne,
) => (terminal: TerminalReference) => {
  const { id, index, sign } = terminal;
  if (id.startsWith("node")) {
    const node = nodes.get(id, new Node());
    const source = sources.get(node.source, new Source());
    if (sign === "+") {
      return new Position2d(node.position.x + 4, node.position.y + index + 1.5);
    } else {
      return new Position2d(
        node.position.x,
        node.position.y + index + 1.5 + source.outputs.size,
      );
    }
  } else {
    if (sign === "+") {
      return new Position2d(0, index + 2.5);
    } else {
      const maxNodeX =
        nodeSources
          .toSeq()
          .filter(sourceId => sourceId === id)
          .keySeq()
          .map(nodeId => nodes.get(nodeId, new Node()).position.x)
          .max() || 0;
      return new Position2d(maxNodeX + 6, index + 2.5);
    }
  }
};

export { TerminalDescription, TerminalReference, terminalPosition };
