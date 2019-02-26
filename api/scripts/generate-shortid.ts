const { generate } = require("shortid");

const count = Number.parseInt(process.argv[2]) || 10;

for (let i = 0; i < count; i++) {
  console.info(generate());
}
