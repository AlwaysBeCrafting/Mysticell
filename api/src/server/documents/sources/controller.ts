import { Request } from "hapi";

import * as Source from "../../../data/Source/service";

const getSources = ({ params: { documentId } }: Request) => {
  return Source.read(documentId);
};

const getSource = ({ params: { documentId, id } }: Request) => {
  return Source.read(documentId, id);
};

export { getSources, getSource };
