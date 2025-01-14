const express = require("express");
const { searchUtil, getLatestPrice, getMarketStatus, getCompanyDetails, getCompanyPeers, getRecommendation, getInsigntSettlement, getCompanyEarnings, getChartData, getCompanyNews, BuyStock, sellStock , getAllStocks, getAllwatchlistStocks, removeFromwatchlist, addTowatchlist } = require("./apiRequest");
const format = require('date-format');
const userPortfolio = require("./models/userPortfolio")
const cors = require("cors")
const app = express();
app.use(express.json());
const watchlist = require('./models/watchlist');
const path = require('path');


app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

// Route to search for a symbol
app.get("/searchutil/:keyword", async (req, res, next) => {
    const keyword = req.params.keyword;
    try {
        const data = await searchUtil(keyword);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});


app.get('/stocks', async (req, res) => {  
    try {
      const stocks = await getAllStocks();
      res.status(200).json(stocks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/portfolio/money', async (req, res) => {  
    try {
    const portfolioItem = await userPortfolio.findOne();
    console.log("por", portfolioItem);
      res.status(200).json(portfolioItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to get the latest price for a symbol
app.get("/latestprice/:keyword", async (req, res, next) => {
    const keyword = req.params.keyword;
    try {
        const data = await getLatestPrice(keyword);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

// Route to get the market status
app.get("/getmarketstatus", async (req, res, next) => {
    try {
        const data = await getMarketStatus();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

// Route to get company details for a symbol
app.get("/company-details/:keyword", async (req, res, next) => {
    const keyword = req.params.keyword;
    try {
        const data = await getCompanyDetails(keyword);
        console.log("errrrr", data)
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

// Route to get peers for a symbol
app.get("/company-peers/:keyword", async (req, res, next) => {
    const keyword = req.params.keyword;
    try {
        const data = await getCompanyPeers(keyword);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

// Route to get insight-settlement for a symbol
app.get("/insight-settlement/:keyword", async (req, res, next) => {
    const keyword = req.params.keyword;
    try {
        const data = await getInsigntSettlement(keyword);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

//Route to get recommendation for a symbol
app.get("/recommendation/:keyword", async (req, res, next) => {
    const keyword = req.params.keyword;
    try {
        const data = await getRecommendation(keyword);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

app.get("/earnings/:keyword", async (req, res, next) => {
    const keyword = req.params.keyword;
    try {
        const data = await getCompanyEarnings(keyword);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});


app.get("/charts/:keyword/:from/:to/:multiplier/:timespan", async (req, res, next) => {
    const keyword = req.params.keyword;
    const from = format.asString("yyyy-MM-dd", new Date(req.params.from));
    const to = format.asString("yyyy-MM-dd", new Date(req.params.to));
    const multiplier = req.params.multiplier;
    const timespan = req.params.timespan;
    try {
        const data = await getChartData(keyword, from, to, multiplier, timespan);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});

// Get ompany news 
app.get("/news/:keyword/:from/:to", async (req, res, next) => {
    const keyword = req.params.keyword;
    const from = format.asString("yyyy-MM-dd", new Date(req.params.from));
    const to = format.asString("yyyy-MM-dd", new Date(req.params.to));
    try {
        const data = await getCompanyNews(keyword, from, to);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
});
app.post('/buy', async (req, res) => {
    const {ticker, name, price, totalPrice, quantity } = req.body;
    try {
        const result = await BuyStock(ticker, name, price,totalPrice, quantity);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Sell endpoint
app.post('/sell', async (req, res) => {
    const { ticker,name, quantity } = req.body;

    try {
        const result = await sellStock(ticker, quantity);
        if (result && result.code) {
            res.status(400).json(result)
        }
        else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/watchlist/add', async (req, res) => {
    const { name, ticker } = req.body;
  
    try {
      const result = await addTowatchlist(name, ticker);
      res.status(201).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Remove from watchlist endpoint
  app.post('/watchlist/remove', async (req, res) => {
    const { ticker } = req.body;
  
    try {
      const result = await removeFromwatchlist(ticker);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/watchlist/:ticker', async (req, res) => {
    try {
      const watchlistItem = await watchlist.findOne({
        symbol: req.params.ticker
      });
  
      if (watchlistItem) {
        res.json({ exists: true });
      } else {
        res.json({ exists: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  app.get('/portfolio/:ticket', async (req, res) => {
    try {
      const portfolioItem = await userPortfolio.findOne();
      if(portfolioItem) {
          const existingStock = portfolioItem.stocks.find(stock => stock.ticker === req.params.ticket);
          if (existingStock) {
            res.json({ exists: true });
          } else {
            res.json({ exists: false });
          }
      }
      else {
        res.json({ exists: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  
  // Get all watchlist stocks endpoint
app.get('/watchlist', async (req, res) => {
try {
    const stocks = await getAllwatchlistStocks();
    res.status(200).json(stocks);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
}
});

// Error handling middleware
const errorHandler = (error, req, res, next) => {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

module.exports = app; // This must be exported
