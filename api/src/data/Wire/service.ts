import { notImplemented } from "boom";

import { Wire } from "./model";

const create = async () => notImplemented();

const read = async (formulaId?: string, id?: string) => {
  if (id) {
    return Wire.query()
      .where({ formulaId })
      .findById(id);
  } else {
    return Wire.query().where({ formulaId });
  }
};

const update = async () => notImplemented();

const destroy = async () => notImplemented();

export { create, read, update, destroy };
