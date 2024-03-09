const { Server } = require("./server");
const { CHANNEL_NAME, AUCTION_PRICE } = require("./constants");

async function main() {
  const channel = CHANNEL_NAME;
  const price = AUCTION_PRICE;
  const server = new Server(channel, price);
}

main();
