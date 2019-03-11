import { Server } from "hapi";
import * as knex from "knex";
import { Model } from "objection";

import { documentRoutes } from "./src/server/documents/routes";

Model.knex(knex(require("./knexfile")));

const init = async () => {
  const server = new Server({
    host: process.env.API_HOST,
    port: process.env.API_PORT,
    routes: {
      cors: { origin: [`http*://${process.env.FRONTEND_WEB_HOST}:*` || ""] },
    },
  });

  await server.register(documentRoutes);

  await server.start();
  console.log(`API listening at ${server.info.uri}`);

  process.on("unhandledRejection", err => {
    console.error(err);
    process.exit(1);
  });
};

init();
