import { Plugin } from "hapi";

import { handleListDocuments } from "./handlers";

const documentRoutes: Plugin<{}> = {
  name: "Document Routes",
  register: server => {
    server.route([
      {
        method: "GET",
        path: "/documents",
        handler: handleListDocuments,
      },
    ]);
  },
};

export { documentRoutes };
