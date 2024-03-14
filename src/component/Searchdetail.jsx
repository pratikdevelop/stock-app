// Searchdetail.js
import React, { useEffect, useState } from 'react';
import { BsStar } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";
import { BsCaretUpFill } from "react-icons/bs";
import { BsCaretDownFill } from "react-icons/bs";
import StockTrade from './StockTrade';
import dayjs from 'dayjs';
import { Alert } from 'react-bootstrap';

const Searchdetail = ({ data }) => {
    const companyDetails = data[0];
    const latestPrice = data[1];
    const [stockExists, setStockExists] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [showModaltype, setShowModaltype] = useState("buy");
    const [showAlert, setShowAlert] = useState(null);
    const handleCloseModal = async (quantity,totalPrice, price) => {
        const ticker = companyDetails.ticker
        const name = companyDetails.name
        try {
            const response = await fetch(`https://stocktrader.site/${showModaltype}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // Add any other headers if required
                },
                body: JSON.stringify({

                    ticker, name, quantity, price, totalPrice
                })
            });
            if (response.ok) {
                // Request successful, handle response if needed
                setShowAlert("Stock added to watchlist successfully");
                checkStockExitstsOrNotInPortfolio();
                setTimeout(() => {
                    setShowAlert(null)
                }, 1000);
            } else {
                // Request failed, handle error response
                console.error("Failed to add stock to watchlist");
            }
        } catch (error) {
            console.error("API Call to add stock to watchlist failed:", error);
        }

        setShowModal(false)
    };
    const handleShowModal = (type) => { setShowModal(true); setShowModaltype(type) };
    const [stockExistsInPortfolio, setStockExistsInPortfolio] = useState(false)
    useEffect(() => {
        checkStockExitstsOrNot();
        checkStockExitstsOrNotInPortfolio();
    }, [companyDetails.ticker])

    const checkStockExitstsOrNot = async () => {
        try {
            const response = await fetch(`https://stocktrader.site/watchlist/${companyDetails.ticker}`);
            const details = await response.json();
            setStockExists(details.exists);
        } catch (error) {
            console.error("API Call to check stock exists in watchlist or not is failed, error:", error);
        }
    }

    const checkStockExitstsOrNotInPortfolio = async () => {
        try {
            const response = await fetch(`https://stocktrader.site/portfolio/${companyDetails.ticker}`);
            const details = await response.json();
            setStockExistsInPortfolio(details.exists);
            console.log("price", stockExistsInPortfolio);
        } catch (error) {
            console.error("API Call to check stock exists in watchlist or not is failed, error:", error);
        }
    }

    const updateWatchlist = async (type) => {
        try {
            const response = await fetch(`https://stocktrader.site/watchlist/${type}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ticker: companyDetails.ticker, name: companyDetails.name })
            });
            await response.json();
            setShowAlert(type === "add" ? "Stock add in watchlist successfuly": "Stock remove from watchlist successfully");
            setTimeout(() => {
                setShowAlert(null)
            }, 2000);
            checkStockExitstsOrNot();
        } catch (error) {
            console.error("API Call to check stock exists in watchlist or not is failed, error:", error);
        }
    }
    return (<>
        {showAlert !== null && (
            <Alert variant="success" dismissible>
                {showAlert}
            </Alert>)}
        <div className='d-flex  justify-content-between align-items-start flex-auto position-relative mt-5' >

            <div className='d-flex flex-column'>
                <h4>{companyDetails.ticker}
                    <span className='ml-5'> {stockExists == false ? <button onClick={() => updateWatchlist("add")} style={{ border: 0, outline: 0, background: "none" }}><BsStar /></button> :
                        <button onClick={() => updateWatchlist("remove")} style={{ border: 0, outline: 0, background: "none", color: "yellow" }}> <BsStarFill /></button>}</span></h4>
                <span>{companyDetails.name}</span>
                <p className='fs-6'>{companyDetails.exchange}</p>
                <div className='d-flex flex-row justify-content-between mt-2 align-items-center mx-5'>
                    <button type='button' onClick={() => handleShowModal("buy")} className='btn btn-success'> Buy</button>
                    {stockExistsInPortfolio == true ?
                        <button type='button' onClick={() => handleShowModal("sell")} className='btn btn-danger'> Sell</button> : null}
                </div>
            </div>
            <div className='d-flex flex-column'>
                <img src={companyDetails.logo} width={60} height={60} />
            </div>
            <div className='d-flex flex-column align-items-center'>
                <h4 className={latestPrice.d > 0 ? "text-green " : "text-red"}>{latestPrice.o}</h4>
                <span className={latestPrice.d > 0 ? "text-green" : "text-red"}>{latestPrice.d > 0 ? <BsCaretUpFill /> : <BsCaretDownFill></BsCaretDownFill>} <span>{latestPrice.d}</span> ({latestPrice.dp?.toFixed(2)}%)</span>
                <span>{dayjs(latestPrice.t).locale("us").format("YYYY-mm-DD h:m:s")}</span>
            </div>
        </div>
        <StockTrade
            show={showModal}
            modeltype={showModaltype}
            handleClose={handleCloseModal}
            title={companyDetails.ticker}
            price={latestPrice.o}
        />
    </>
    );
};

export default Searchdetail;
