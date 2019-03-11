import { Plugin } from "hapi";

import { getCells, getCell } from "./controller";

const cellRoutes: Plugin<{}> = {
  name: "Route: /documents/*/sheets/*/cells",
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

export { cellRoutes };
