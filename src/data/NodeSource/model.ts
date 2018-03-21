import { PinGroup } from "data/PinGroup";

interface NodeSourceProps {
  id: string;
  name: string;
  inputPins: PinGroup;
  outputPins: PinGroup;
}

interface NodeSource extends Readonly<NodeSourceProps> {}

export { NodeSourceProps, NodeSource };
