import { Position2d } from "common/types";

import { Node } from "data/Node";
import { Source } from "data/Source";

import { EntityTable, ParamType } from ".";

interface TerminalDescription {
  name: string;
  type: ParamType;
}

interface TerminalReference {
  id: string;
  sign: "+" | "-";
  index: number;
}

const terminalPosition = (
  nodes: EntityTable<Node>,
  sources: EntityTable<Source>,
) => (terminal: TerminalReference) => {
  const { id, index, sign } = terminal;
  if (id.startsWith("node")) {
    const node = nodes.get(id, new Node());
    const source = sources.get(node.source, new Source());
    if (sign === "+") {
      return new Position2d(node.position.x, node.position.y + index + 1.5);
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
      /* Use `Infinity` to represent 100%, or the far right side of the grid
         TODO: Re-evaluate, seems like a gotcha waiting to happen */
      return new Position2d(Infinity, index + 2.5);
    }
  }
};

export { TerminalDescription, TerminalReference, terminalPosition };
