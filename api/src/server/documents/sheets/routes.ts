import { Plugin } from "hapi";

import { getSheets, getSheet } from "./controller";

import { cellRoutes } from "./cells/routes";

const sheetRoutes: Plugin<{}> = {
  name: "Route: /documents/*/sheets",
  register: server => {
    server.route([
      {
        method: "GET",
        path: "/documents/{documentId}/sheets",
        handler: getSheets,
      },
      {
        method: "GET",
        path: "/documents/{documentId}/sheets/{id}",
        handler: getSheet,
      },
    ]);
    server.register([cellRoutes]);
  },
};

export { sheetRoutes };
