import { Plugin } from "hapi";

import { getWires, getWire } from "./controller";

const wireRoutes: Plugin<{}> = {
  name: "Route: /documents/*/sources/*/wires",
  register: server => {
    server.route([
      {
        method: "GET",
        path: "/documents/{documentId}/sources/{sourceId}/wires",
        handler: getWires,
      },
      {
        method: "GET",
        path: "/documents/{documentId}/sources/{sourceId}/wires/{id}",
        handler: getWire,
      },
    ]);
  },
};

export { wireRoutes };
