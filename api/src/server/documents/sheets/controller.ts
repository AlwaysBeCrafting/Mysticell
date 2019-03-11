import { Request } from "hapi";

import * as Sheet from "../../../data/Sheet/service";

const getSheets = ({ params: { documentId } }: Request) => {
  return Sheet.read(documentId);
};

const getSheet = ({ params: { documentId, id } }: Request) => {
  return Sheet.read(documentId, id);
};

export { getSheets, getSheet };
