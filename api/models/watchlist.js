const mongoose = require("mongoose");
const watchlistSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    symbol: {
      type: String,
      required: true,
      unique: true
    }
  });
  
  module.exports = mongoose.model('watchlist', watchlistSchema);