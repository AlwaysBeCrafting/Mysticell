import { notImplemented } from "boom";

import { Formula } from "./model";

const create = async () => notImplemented();

const read = async (id: string) => {
  return Formula.query().findById(id);
};

const update = async () => notImplemented();

const destroy = async () => notImplemented();

export { create, read, update, destroy };
