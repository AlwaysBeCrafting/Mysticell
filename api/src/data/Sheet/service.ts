import { notImplemented } from "boom";

import { Sheet } from "./model";

const create = async () => notImplemented();

const read = async (documentId?: string, id?: string) => {
  if (id) {
    return Sheet.query()
      .where({ documentId })
      .findById(id);
  } else {
    return Sheet.query().where({ documentId });
  }
};

const update = async () => notImplemented();

const destroy = async () => notImplemented();

export { create, read, update, destroy };
