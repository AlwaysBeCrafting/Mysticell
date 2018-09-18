import { compose, Manifest } from "glue";

const manifest: Manifest = {
  server: {}
};

const startServer = async () => {
  try {
    const server = await compose(manifest);
    await server.start();
    console.log(`API listening at ${server.info.uri}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
