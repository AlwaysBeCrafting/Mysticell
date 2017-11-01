import shortid from "shortid";

import { InnerNode } from "data/Graph";

import { NodePrototype } from "./model";

const generateGraphNode = (nodePrototype: NodePrototype): InnerNode =>
  new InnerNode({
    id: `node.${shortid()}`,
    prototype: nodePrototype.id,
    constants: nodePrototype.inputNames.map(_ => ""),
  });

export { generateGraphNode };
