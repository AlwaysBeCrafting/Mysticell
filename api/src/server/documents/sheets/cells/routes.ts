import { Plugin } from "hapi";

import { getCells, getCell } from "./controller";

const documentRoutes: Plugin<{}> = {
  name: "Route: /documents",
  register: server => {
    server.route([
      {
        method: "GET",
        path: "/documents/{documentId}/sheets/{sheetId}/cells",
        handler: getCells,
      },
      {
        method: "GET",
        path: "/documents/{documentId}/sheets/{sheetId}/cells/{id}",
        handler: getCell,
      },
    ]);
  },
};

export { documentRoutes };
