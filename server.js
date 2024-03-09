const Hyperswarm = require("hyperswarm");
const { Auction } = require("./auction");
const readline = require("readline");

class Server {
  constructor(channel, price) {
    this.server = new Hyperswarm();
    this.players = new Map();
    this.auction = new Auction(price);

    this.connections = [];

    this.discovery = this.server.join(Buffer.alloc(32).fill(channel), {
      server: true,
      client: false,
    });

    this.handleConnection = this.handleConnection.bind(this);
    this.server.on("connection", this.handleConnection);
    // Set up CLI
    this.setupCLI();
  }

  async setupCLI() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", async (input) => {
      // Handle CLI input
      console.log(`CLI Input: ${input}`);
      // Example: Handle CLI command
      await this.handleCLICommand(input);
    });
  }

  async handleCLICommand(input) {
    // TODO: Aca hay que hacer lo del close.
    console.log(`Handling CLI command: ${input}`);
    // Example: Implement logic based on CLI input
    if (input === "close") {
      this.broadcast(
        "The auction is closed. Sold to " +
          this.auction.lastClient +
          " for " +
          this.auction.lastBid
      );
    }
  }

  async handleConnection(conn, info) {
    const publicKey = info.publicKey.toString("hex");
    if (this.players.size) {
      if (!this.players.has(publicKey)) {
        this.addPlayer(publicKey);
        this.connections.push(conn);
      }
    } else {
      this.addPlayer(publicKey);
      this.connections.push(conn);
    }

    conn.write(
      JSON.stringify({
        type: "update",
        message: `The auction price is ${this.auction.lastBid}`,
      })
    );

    conn.on("data", async (data) => {
      const jsonData = JSON.parse(data.toString());
      console.log("Server: ", jsonData);
      const price = parseInt(jsonData.price);

      if (this.auction.open === true) {
        if (price > this.auction.lastBid) {
          this.auction.lastBid = price;
          this.auction.lastClient = publicKey;
          this.broadcast(`The last bid was ${this.auction.lastBid}`);
        } else {
          conn.write(
            JSON.stringify({
              type: "update",
              message: `The last bid was ${this.auction.lastBid}`,
            })
          );
        }
      }
    });
  }

  broadcast(data) {
    for (const conn of this.connections) {
      conn.write(JSON.stringify({ type: "update", message: data }));
    }
  }

  addPlayer(publicKey) {
    this.players.set(publicKey, true);
  }

  notifyStatusOption() {
    const lastBid = this.auction.lastBid;

    this.broadcast(`The last bid was ${lastBid}`);
  }
}

module.exports = {
  Server,
};
