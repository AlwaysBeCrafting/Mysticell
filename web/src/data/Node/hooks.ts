import { List } from "immutable";
import { useSelector, useDispatch } from "react-redux";

import { Position2d } from "~/common/types";

import { App } from "~/data/App";
import { Node } from "~/data/Node";

import { ActionTypes } from "./actions";

const useNodeList = (formulaId: string) => {
  const nodes = useSelector(
    (state: App) => state.formulaNodes.get(formulaId, List<string>()),
    [formulaId],
  );
  const dispatch = useDispatch();
  const actions = {
    insert: (node: Node) =>
      dispatch({
        type: ActionTypes.INSERT,
        payload: { node },
      }),
  };
  return [nodes, actions] as const;
};

const useNode = (nodeId: string) => {
  const node = useSelector(
    (state: App) => state.nodes.getEntity(nodeId, new Node()),
    [nodeId],
  );
  const dispatch = useDispatch();
  const actions = {
    delete: (id: string) =>
      dispatch({
        type: ActionTypes.DELETE,
        payload: { id },
      }),

    setLabel: (id: string, label: string) =>
      dispatch({
        type: ActionTypes.SET_LABEL,
        payload: { id, label },
      }),

    move: (id: string, position: Position2d) =>
      dispatch({
        type: ActionTypes.SET_POSITION,
        payload: { id, position },
      }),
  };
  return [node, actions] as const;
};

export { useNodeList, useNode };
