import { Plugin } from "hapi";

import { getWires, getWire } from "./controller";

const documentRoutes: Plugin<{}> = {
  name: "Route: /documents",
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

export { documentRoutes };
