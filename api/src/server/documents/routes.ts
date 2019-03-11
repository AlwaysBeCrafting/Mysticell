import { Plugin } from "hapi";

import { getDocuments, getDocument } from "./controller";

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
  },
};

export { documentRoutes };