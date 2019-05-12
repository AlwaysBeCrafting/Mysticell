import { List } from "immutable";
import { useSelector } from "react-redux";

import { App } from "data/App";
import { Node } from "data/Node";

const useNodeList = (formulaId: string) => {
  const nodes = useSelector(
    (state: App) => state.formulaNodes.get(formulaId, List<string>()),
    [formulaId],
  );
  const actions = {};
  return [nodes, actions] as const;
};

const useNode = (nodeId: string) => {
  const node = useSelector(
    (state: App) => state.nodes.getEntity(nodeId, new Node()),
    [nodeId],
  );
  const actions = {};
  return [node, actions] as const;
};

export { useNodeList, useNode };
