class Auction {
  constructor(basePrice) {
    this.open = true;
    this.basePrice = basePrice;
    this.lastBid = basePrice;
    this.lastClient = null;
  }
}

module.exports = {
  Auction,
};
