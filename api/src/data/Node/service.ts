import { notImplemented } from "boom";

import { Node } from "./model";

const create = async () => notImplemented();

const read = async (formulaId?: string, id?: string) => {
  if (id) {
    return Node.query()
      .where({ formulaId })
      .findById(id);
  } else {
    return Node.query().where({ formulaId });
  }
};

const update = async () => notImplemented();

const destroy = async () => notImplemented();

export { create, read, update, destroy };
