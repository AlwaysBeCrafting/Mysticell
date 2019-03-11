import { Plugin } from "hapi";

import { getNodes, getNode } from "./controller";

const nodeRoutes: Plugin<{}> = {
  name: "Route: /documents/*/sources/*/nodes",
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

export { nodeRoutes };
