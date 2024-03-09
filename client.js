const Hyperswarm = require("hyperswarm");
const { CLI } = require("./cli");

class Client {
  constructor(channel) {
    this.client = new Hyperswarm();
    this.cli = new CLI();
    this.client.join(Buffer.alloc(32).fill(channel), {
      client: true,
      server: false,
    });

    this.handleConnection = this.handleConnection.bind(this);
    this.client.on("connection", this.handleConnection);
  }

  async handleConnection(conn, info) {
    console.log("Connected to server!\n");
    this.connection = conn;
    conn.on("data", async (data) => {
      const jsonData = JSON.parse(data.toString());
      if (jsonData.type === "update") {
        console.log("Server: ", jsonData.message);
        process.stdout.write("> ");
      }
      await this.askClient();
    });
  }

  async askClient() {
    this.cli.ask(`> `).then((input) => {
      this.connection.write(JSON.stringify({ type: "update", price: input }));
    });
  }
}

module.exports = {
  Client,
};
