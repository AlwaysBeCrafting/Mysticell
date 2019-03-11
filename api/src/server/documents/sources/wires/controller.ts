import { Request } from "hapi";

import * as Wire from "../../../../data/Wire/service";

const getWires = ({ params: { documentId } }: Request) => {
  return Wire.read(documentId);
};

const getWire = ({ params: { documentId, id } }: Request) => {
  return Wire.read(documentId, id);
};

export { getWires, getWire };
