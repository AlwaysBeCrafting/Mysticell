import * as Document from "../../data/Document/service";

const getDocuments = () => {
  return Document.read();
};

export { getDocuments };
