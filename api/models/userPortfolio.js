const mongoose = require("mongoose");

// Mongoose schema for user data
const userPortfoliSchema = new mongoose.Schema({
    totalAmount: {
      type: Number,
      default: 25000
    },
    stocks: [{
      ticker: String,
      name: String,
      price: Number,
      totalPrice: Number, // Total price for the total quantity of the stock bought
      totalQuantityBought: Number, // Total quantity of the stock bought
      totalQuantity: Number // Total quantity of the stock
    }]
  });

const userPortfolio = new mongoose.model("userPortfolio", userPortfoliSchema)
module.exports = userPortfolio;
  