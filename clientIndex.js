const { Client } = require("./client");
const { CHANNEL_NAME } = require("./constants");

async function main() {
  const channel = CHANNEL_NAME;
  const client = new Client(channel);
}

main();
