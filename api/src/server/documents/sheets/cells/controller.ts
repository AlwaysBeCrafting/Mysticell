import { Request } from "hapi";

import * as Cell from "../../../../data/Cell/service";

const getCells = ({ params: { sheetId } }: Request) => {
  return Cell.read(sheetId);
};

const getCell = ({ params: { sheetId, id } }: Request) => {
  return Cell.read(sheetId, id);
};

export { getCells, getCell };
