import { notImplemented } from "boom";

import { Cell } from "./model";

const create = async () => notImplemented();

const read = async (sheetId?: string, id?: string) => {
  if (id) {
    return Cell.query()
      .where({ sheetId })
      .findById(id);
  } else {
    return Cell.query().where({ sheetId });
  }
};

const update = async () => notImplemented();

const destroy = async () => notImplemented();

export { create, read, update, destroy };
