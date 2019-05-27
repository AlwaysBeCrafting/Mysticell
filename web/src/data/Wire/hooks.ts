import { List } from "immutable";
import { useSelector, useDispatch } from "react-redux";

import { App } from "~/data/App";
import { Wire } from "~/data/Wire";

import { ActionTypes } from "./actions";

const useWireList = (formulaId: string) => {
  const wires = useSelector(
    (state: App) => state.formulaWires.get(formulaId, List<string>()),
    [formulaId],
  );
  const dispatch = useDispatch();
  const actions = {
    insert: (wire: Wire) =>
      dispatch({
        type: ActionTypes.INSERT,
        payload: { wire },
      }),
  };
  return [wires, actions] as const;
};

const useWire = (wireId: string) => {
  const wire = useSelector(
    (state: App) => state.wires.getEntity(wireId, new Wire()),
    [wireId],
  );
  const actions = {};
  return [wire, actions] as const;
};

export { useWireList, useWire };
