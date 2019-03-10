import { Plugin } from "hapi";

import { getSources, getSource } from "./controller";

const documentRoutes: Plugin<{}> = {
  name: "Route: /documents",
  register: server => {
    server.route([
      {
        method: "GET",
        path: "/documents/{documentId}/sources",
        handler: getSources,
      },
      {
        method: "GET",
        path: "/documents/{documentId}/sources/{id}",
        handler: getSource,
      },
    ]);
  },
};

export { documentRoutes };
