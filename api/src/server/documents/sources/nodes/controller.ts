import { Request } from "hapi";

import * as Node from "../../../../data/Node/service";

const getNodes = ({ params: { documentId } }: Request) => {
  return Node.read(documentId);
};

const getNode = ({ params: { documentId, id } }: Request) => {
  return Node.read(documentId, id);
};

export { getNodes, getNode };
