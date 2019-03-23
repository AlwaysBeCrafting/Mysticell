import { notImplemented } from "boom";

import { Document } from "./model";

const create = async () => notImplemented();

const read = async (id?: string) => {
  if (id) {
    return Document.query().findById(id);
  } else {
    return Document.query();
  }
};

const update = async () => notImplemented();

const destroy = async () => notImplemented();

export { create, read, update, destroy };
