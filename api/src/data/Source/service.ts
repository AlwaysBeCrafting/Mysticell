import { notImplemented } from "boom";

import { Source } from "./model";

const create = async () => notImplemented();

const read = async (documentId?: string, id?: string) => {
  if (id) {
    return Source.query()
      .where({ documentId })
      .findById(id);
  } else {
    return Source.query().where({ documentId });
  }
};

const update = async () => notImplemented();

const destroy = async () => notImplemented();

export { create, read, update, destroy };
