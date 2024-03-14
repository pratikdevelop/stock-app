import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import StockTrade from './StockTrade';
import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";

const Portfolio = () => {
    const [loading, setLoading] = useState(true);
    const [portfolioStocks, setPortfolioStocks] = useState({});
    const [portfolioStock, setPortfolioStock] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showModaltype, setShowModaltype] = useState("buy");
    const [showAlert, setShowAlert] = useState(null);

    const handleCloseModal = async (quantity, totalPrice,  price) => {
        const ticker = portfolioStock.ticker;
        const name = portfolioStock.name;
        try {
            const response = await fetch(`https://stocktrader.site/${showModaltype}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // Add any other headers if required
                },
                body: JSON.stringify({ ticker, name, quantity, price,totalPrice })
            });
            if (response.ok) {
                setShowAlert("Stock added to watchlist successfully");
                getPortfolioStock();
                setTimeout(() => {
                    setShowAlert(null);
                }, 1000);
            } else {
                console.error("Failed to add stock to watchlist");
            }
        } catch (error) {
            console.error("API Call to add stock to watchlist failed:", error);
        }
        setShowModal(false);
    };

    const handleShowModal = (type, stock) => {
        setShowModal(true);
        setShowModaltype(type);
        setPortfolioStock(stock);
    };

    useEffect(() => {
        getPortfolioStock();
    }, []);

    const getPortfolioStock = async () => {
        try {
            const response = await fetch(`https://stocktrader.site/stocks`);
            const details = await response.json();
            setPortfolioStocks(details);

            const updatedStocks = await Promise.all(details.stocks.map(async (stock) => {
                try {
                    const response = await fetch(`https://stocktrader.site/latestprice/${stock.ticker}`);
                    const price = await response.json();
                    stock.latestprice = price ? price : null;
                    return stock;
                } catch (error) {
                    console.error("Failed to fetch the latest price:", error);
                    return { ...stock, price: null };
                }
            }));

            setPortfolioStocks({ ...details, stocks: updatedStocks });
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch portfolio stocks:", error);
        }
    };

    return (
        <div className='d-flex flex-column align-items-start position-relative mt-5 py-5'>
            {showAlert !== null && (
                <Alert variant="success" dismissible>
                    {showAlert}
                </Alert>
            )}
            <h1>MY PORTFOLIO</h1>
            <h2>Money In Wallet: {portfolioStocks.totalAmount}</h2>
            {!loading && portfolioStocks.stocks.length > 0 && (
                <>
                    {portfolioStocks.stocks.map((stock) => (
                        <div className="card" key={stock.ticker}>
                            <div className="card-header">
                                {stock.ticker} {stock.name}
                            </div>
                            <div className="card-body row">
                                <div className="row col-6">
                                    <div className="col-6">Quantity:</div>
                                    <div className="col-6">{stock.totalQuantity}</div>
                                    <div className="col-6">Avg/Cost Price:</div>
                                    <div className="col-6">{stock.price}</div>
                                    <div className="col-6">Total Price:</div>
                                    <div className="col-6">{stock.totalPrice}</div>
                                </div>
                                <div className={`row col-6 ${stock?.latestprice?.d > 0 ? 'text-success' : 'text-danger'}`}>
                                    <div className="col-6">Change:</div>
                                    <div className="col-6">{stock?.latestprice?.d > 0 ? <BsCaretUpFill /> : <BsCaretDownFill />}{stock?.latestprice?.d}</div>
                                    <div className="col-6">Current Price:</div>
                                    <div className="col-6">{stock?.latestprice?.c}</div>
                                    <div className="col-6">Market Value:</div>
                                    <div className="col-6">{stock?.latestprice?.c * stock.totalQuantity}</div>
                                </div>
                            </div>
                            <div className="card-footer text-body-secondary">
                                <div className='d-flex flex-row gap-3 mt-2 align-items-center w-25'>
                                    <button type='button' onClick={() => handleShowModal("buy", stock)} className='btn btn-success'> Buy</button>
                                    <button type='button' onClick={() => handleShowModal("sell", stock)} className='btn btn-danger'> Sell</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
            {!loading && portfolioStocks.stocks.length === 0 && (
                <Alert variant="success" dismissible>
                    There are no stocks in the portfolio
                </Alert>
            )}
            <StockTrade
                show={showModal}
                modeltype={showModaltype}
                handleClose={handleCloseModal}
                title={portfolioStock.ticker}
                price={portfolioStock?.latestprice?.o}
            />
        </div>
    );
};

export default Portfolio;
