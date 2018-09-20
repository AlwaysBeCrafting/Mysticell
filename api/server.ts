import { Server } from "hapi";

const init = async () => {
  try {
    const server = new Server({
      host: process.env.API_HOST,
      port: process.env.API_PORT,
    });

    await server.start();
    console.log(`API listening at ${server.info.uri}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

init();
