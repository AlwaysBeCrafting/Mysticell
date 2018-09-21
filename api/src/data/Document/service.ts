import { Document } from "./Document";

const listDocuments = async (limit: number = 10) => {
  return Document.query().limit(limit);
};

export { listDocuments };
