import { Plugin } from "hapi";

import { getDocuments, getDocument } from "./controller";

import { sheetRoutes } from "./sheets/routes";
import { sourceRoutes } from "./sources/routes";

const documentRoutes: Plugin<{}> = {
  name: "Route: /documents",
  register: server => {
    server.route([
      {
        method: "GET",
        path: "/documents",
        handler: getDocuments,
      },
      {
        method: "GET",
        path: "/documents/{id}",
        handler: getDocument,
      },
    ]);
    server.register([sheetRoutes, sourceRoutes]);
  },
};

export { documentRoutes };
