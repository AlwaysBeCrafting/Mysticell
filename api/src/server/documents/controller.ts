import { Request } from "hapi";

import * as Document from "../../data/Document/service";

const getDocuments = () => {
  return Document.read();
};

const getDocument = ({ params: { id } }: Request) => {
  return Document.read(id);
};

export { getDocuments, getDocument };
