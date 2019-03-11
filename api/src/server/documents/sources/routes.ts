import { Plugin } from "hapi";

import { getSources, getSource } from "./controller";
import { nodeRoutes } from "./nodes/routes";
import { wireRoutes } from "./wires/routes";

const sourceRoutes: Plugin<{}> = {
  name: "Route: /documents/*/sources",
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
    server.register([nodeRoutes, wireRoutes]);
  },
};

export { sourceRoutes };
