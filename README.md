# Tether Challenge Solution

This is a simple auction application implemented using Hyperswarm, allowing multiple clients to bid on items in real-time.

## Features

Initiate an auction with a specified starting price.
Accept bids from clients and broadcast updates to all connected clients.
Close the auction and announce the winning bid.

## Installation

Clone this repository to your local machine.
Install dependencies by running npm install.

## Usage

### Initiating an Auction

First, you should complete the data in `constants.js`
Then, you have to run:

```
node serverIndex.js
```

### Initiating the Client

Run

```
node clientIndex.js
```

The client automatically connects to the previously started auction server upon initialization. Once connected, it awaits updates from the server and prompts the user to place bids via the Command Line Interface (CLI).

### Placing a bid

To place a bid, simply enter the desired bid amount when prompted by the CLI. The client will send the bid to the server, and you'll receive updates on the auction status.

### Closing an Auction

To close the auction and announce the winning bid, use the CLI with the command 'close'.

## Additional Features

Although I didn't implement this feature due to time constraints, it's a valuable enhancement to consider for future iterations of the project.

### Using Hyperswarm with True True Configuration

By configuring Hyperswarm with true true, each client acts as a small RPC server, allowing for bid broadcasting and maintaining bid lists in each server's memory.

### Hyperbee and Hypercore Integration

For a more robust and distributed solution, consider integrating Hyperbee and Hypercore in a "many writers" and "many readers" configuration. This setup enables the creation of a distributed tree-based database replicated in each client-server, containing every auction and last bid.

### Replacing constants with user inputs

While I initially set up the auction with fixed values for the channel name and base price, it's worth noting that I could enhance the solution by allowing user input via a Command Line Interface (CLI). This would enable users to specify the channel name and starting price interactively, providing greater flexibility and customization.
