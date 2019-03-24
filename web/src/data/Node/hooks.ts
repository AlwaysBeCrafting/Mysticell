import { useStore } from "data/store";

const useNodeList = (formulaId: string) => {
  const [state] = useStore();
  return [state.formulaNodes.getRelated(formulaId), {}];
};

const useNode = (nodeId: string) => {
  const [state] = useStore();
  return [state.nodes.getEntity(nodeId), {}];
};

export { useNodeList, useNode };
