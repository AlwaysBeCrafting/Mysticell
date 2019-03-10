import { Plugin } from "hapi";

import { getNodes, getNode } from "./controller";

const documentRoutes: Plugin<{}> = {
  name: "Route: /documents",
  register: server => {
    server.route([
      {
        method: "GET",
        path: "/documents/{documentId}/sources/{sourceId}/nodes",
        handler: getNodes,
      },
      {
        method: "GET",
        path: "/documents/{documentId}/sources/{sourceId}/nodes/{id}",
        handler: getNode,
      },
    ]);
  },
};

export { documentRoutes };
