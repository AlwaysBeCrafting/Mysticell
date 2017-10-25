import shortid from "shortid";

import { InnerNode } from "data/Graph";

import { NodePrototype } from "./model";

const generateGraphNode = (nodePrototype: NodePrototype): InnerNode => {
  return {
    id: `node.${shortid()}`,
    prototype: nodePrototype.id,
    edges: [],
    constants: nodePrototype.inputNames.map(_ => ""),
  };
};

export { generateGraphNode };
