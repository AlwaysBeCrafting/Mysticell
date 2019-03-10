import { Plugin } from "hapi";

import { getDocuments } from "./controller";

const documentRoutes: Plugin<{}> = {
  name: "Route: /documents",
  register: server => {
    server.route([
      {
        method: "GET",
        path: "/documents",
        handler: getDocuments,
      },
    ]);
  },
};

export { documentRoutes };
