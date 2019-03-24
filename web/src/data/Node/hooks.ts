import { useStore } from "data/store";
import { tuple } from "common/utils";

const useNodeList = (formulaId: string) => {
  const [state] = useStore();
  return tuple(
    state.formulaNodes
      .getRelated(formulaId)
      .map(nodeId => state.nodes.getEntity(nodeId)),
    {},
  );
};

const useNode = (nodeId: string) => {
  const [state] = useStore();
  return tuple(state.nodes.getEntity(nodeId), {});
};

export { useNodeList, useNode };
