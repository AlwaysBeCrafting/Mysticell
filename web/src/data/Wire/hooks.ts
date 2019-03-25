import { List } from "immutable";

import { useStore, tuple } from "common/utils";
import { App } from "data/App";

const useWireList = (formulaId: string) => {
  const [state] = useStore<App>();
  return tuple(state.formulaWires.get(formulaId, List()), {});
};

const useWire = (wireId: string) => {
  const [state] = useStore<App>();
  return tuple(state.wires.getEntity(wireId), {});
};

export { useWireList, useWire };
