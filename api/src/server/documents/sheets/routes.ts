import { Plugin } from "hapi";

import { getSheets, getSheet } from "./controller";

const documentRoutes: Plugin<{}> = {
  name: "Route: /documents",
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
  },
};

export { documentRoutes };
