import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { IoMdCloseCircleOutline } from "react-icons/io";

const Watchlist = () => {
    const [watchList, setWatchList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(null);

    useEffect(() => {
        getWatchlist();
    }, []);
    const getWatchlist = async () => {
        try {
            const response = await fetch("https://stocktrader.site/watchlist");
            const lists = await response.json();
            setWatchList(lists);

            const updatedLists = await Promise.all(lists.map(async (list) => {
                try {
                    const response = await fetch(`https://stocktrader.site/latestprice/${list.name}`);
                    const price = await response.json();
                    list.latestprice = price ? price : null;
                    return list;
                } catch (error) {
                    console.error("Failed to fetch the latest price:", error);
                    return { ...list, price: null };
                }
            }));

            setWatchList(updatedLists);
            console.log("watch", watchList);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.error("Error occurred while fetching the watchlist:", error);
        }
    };


    const updateWatchlist = async (ticker) => {
        try {
            const response = await fetch(`https://stocktrader.site/watchlist/remove`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ticker })
            });
            await response.json();
            setShowAlert("Stock remove from watchlist successfully");
            setTimeout(() => {
                setShowAlert(null)
            }, 2000);
            getWatchlist();

        } catch (error) {
            console.error("API Call to check stock exists in watchlist or not is failed, error:", error);
        }
    }

    return (
                <div className='d-flex flex-column align-items-start position-relative mt-5 py-5 w-full'>
            <h1>MY WATCHLIST</h1>
            {!loading && watchList.length > 0 ? (
                watchList.map((stock, index) => (
                    <div className="card w-100 p-4" key={index}>
                        <button onClick={()=>updateWatchlist(stock.name)}><IoMdCloseCircleOutline/></button>
                        <div className=" row">
                            <div className="col-6">{stock.name}</div>
                            <div className="col-6">{stock.latestprice?.d}</div>
                            <div className="col-6">{stock.symbol}</div>
                            <div className="col-6">{stock.latestprice?.c}</div>
                        </div>
                    </div>
                ))
            ) : (
                <Alert variant="success" dismissible>
                    {watchList.length === 0 ? "There are no stocks in the portfolio" : "Loading..."}
                </Alert>
            )}
        </div>
    );
};

export default Watchlist;
