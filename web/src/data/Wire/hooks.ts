import { useStore } from "data/store";

const useWireList = (formulaId: string) => {
  const [state] = useStore();
  return [state.formulaWires.getRelated(formulaId), {}];
};

const useWire = (wireId: string) => {
  const [state] = useStore();
  return [state.wires.getEntity(wireId), {}];
};

export { useWireList, useWire };
