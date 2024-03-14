import React, { useEffect, useState } from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Searchdetail from './Searchdetail';
import Summary from './Summary'
import Newsdetail from './Newsdetails';
import Charts from './Charts';
import Insignhts from './Insignhts';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useLocation } from "react-router-dom";

const Autocomplete = () => {

  const { ticker } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(ticker || "");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [latestPrice, setLatestPrice] = useState({});
  const [companyDetails, setCompanyDetails] = useState({});
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false); // Add loading state
  const location = useLocation();

  useEffect(() => {
    if (ticker) {
      getLatestPrice();
      getCompanyDetails();
    }
    setFilteredSuggestions([]);
    // Call getLatestPrice every 15 seconds
    const intervalId = setInterval(() => {
      getLatestPrice();
    }, 1500000);

    return () => clearInterval(intervalId); // Clean up interval
  }, [ticker]);

  const handleClear = () => {
    setSearchTerm('');
    setFilteredSuggestions([]); // Clear suggestions
    document.getElementById('searchTerm').value = "";
    // Check if the current route is '/search/ticker'
    if (location.pathname === '/search/' + ticker) {
      navigate('/');
    }
  };

  const handleChange = async (event) => {
    const searchTerm = event.target.value;

    if (searchTerm) {
      setLoading(true); // Set loading when typing
      setFilteredSuggestions([]);
      try {
        const response = await fetch(`https://stocktrader.site/

searchutil/${searchTerm}`);
        const data = await response.json();
        setFilteredSuggestions(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Remove loading after fetching data or on error
      }
    }
  };

  const getLatestPrice = async () => {
    try {
      const response = await fetch(`https://stocktrader.site/latestprice/${ticker}`);
      const price = await response.json();
      setLatestPrice(price);
      console.log("price", latestPrice);
    } catch (error) {
      console.error("Failed to fetch the latest price:", error);
    }
  };

  const getCompanyDetails = async () => {
    try {
      const response = await fetch(`https://stocktrader.site/company-details/${ticker}`);
      const details = await response.json();
      setCompanyDetails(details);
      console.log("price", companyDetails);
    } catch (error) {
      console.error("Failed to fetch company details:", error);
    }
  };

  return (
    <div className='d-flex flex-column flex-auto position-relative search-form '>
      <div className='d-flex flex-column mx-auto justify-content-center align-items-center'>
        <h5 className='text-center'>STOCK SEARCH</h5>
        <Form>
          <InputGroup>
            <FormControl
              type="text"
              defaultValue={searchTerm} // Use defaultValue instead of value
              onChange={handleChange} // Add onChange handler to make the field mutable
              placeholder="Search"
              id='searchTerm'
              className='active:outline-0 active:border-0'
              style={{ width: "40rem !important" }}
            />
            {(ticker || (searchTerm)) && (<Button variant="light" onClick={handleClear} className="close-button">
              <IoMdCloseCircleOutline />
            </Button>)
            }
          </InputGroup>
          <ul className="list-group" style={{ height: "250px !important", overflowY: "auto !important" }}>
            {loading ? (
              <li className="list-group-item">Loading...</li>
            ) : (
                filteredSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="list-group-item cursor-pointer"
                    onClick={() => navigate("/search/" + suggestion.symbol)}
                  >
                    {suggestion.description} {suggestion.symbol}
                  </li>
                ))
              )}
          </ul>
        </Form>
      </div>
      {ticker && companyDetails && latestPrice && (
        <>
          <Searchdetail data={[companyDetails, latestPrice]} />
          <div className='w-full d-flex flex-column flex-auto mt-3'>
            <ul className="nav nav-tabs w-full">
              <li className="nav-item">
                <button onClick={() => setCurrentTab(0)} className={currentTab === 0 ? "nav-link active" : "nav-link"} >Summary</button>
              </li>
              <li className="nav-item">
                <button onClick={() => setCurrentTab(1)} className={currentTab === 1 ? "nav-link active" : "nav-link"} >Top News</button>
              </li>
              <li className="nav-item">
                <button onClick={() => setCurrentTab(2)} className={currentTab === 2 ? "nav-link active" : "nav-link"} >Charts</button>
              </li>
              <li className="nav-item">
                <button onClick={() => setCurrentTab(3)} className={currentTab === 3 ? "nav-link active" : "nav-link"} >Insights</button>
              </li>
            </ul>
            {currentTab === 0 ? (
              <Summary data={[companyDetails, latestPrice]} />
            ) : currentTab === 1 ? (
              <Newsdetail ticker={ticker} />
            ) : currentTab === 2 ? (
              <Charts ticker={ticker} />
            ) : (
                  <Insignhts ticker={{ ticker, exchange: companyDetails.exchange }} />
                )}
          </div>
        </>
      )}
    </div>
  );
};

export default Autocomplete;
