import { useStore } from "data/store";
import { tuple } from "common/utils";

const useWireList = (formulaId: string) => {
  const [state] = useStore();
  return tuple(
    state.formulaWires
      .getRelated(formulaId)
      .map(wireId => state.wires.getEntity(wireId)),
    {},
  );
};

const useWire = (wireId: string) => {
  const [state] = useStore();
  return tuple(state.wires.getEntity(wireId), {});
};

export { useWireList, useWire };
