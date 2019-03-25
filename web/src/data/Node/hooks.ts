import { tuple, useStore } from "common/utils";
import { App } from "data/App";

const useNodeList = (formulaId: string) => {
  const [state] = useStore<App>();
  return tuple(
    state.formulaNodes
      .getRelated(formulaId)
      .map(nodeId => state.nodes.getEntity(nodeId)),
    {},
  );
};

const useNode = (nodeId: string) => {
  const [state] = useStore<App>();
  return tuple(state.nodes.getEntity(nodeId), {});
};

export { useNodeList, useNode };
