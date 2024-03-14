import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from './component/Navbar';
import SearchForm from './component/SearchForm';
import Footer from './component/Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import Watchlist from "./component/Watchlist"
import Portfolio from './component/Portfolio';
const App = () => {
  setInterval(() => {
  getMarketStatus();
  }, 500000);
  const getMarketStatus = async() =>{
    try {
      const response = await fetch("https://stocktrader.site/getmarketstatus");
      const data = await response.json();
    } catch (error) {
      
    }
  }
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<SearchForm />}>
         
        </Route>
          <Route
            exact
            path="/search/:ticker"
            element={<SearchForm />}
          ></Route>
             <Route
            exact
            path="/watchlist"
            element={<Watchlist />}
          ></Route>
             <Route
            exact
            path="/portfolio"
            element={<Portfolio />}
          ></Route>

        </Routes>
        <Footer />
      </Router >
    </div >
  );
}

export default App;
