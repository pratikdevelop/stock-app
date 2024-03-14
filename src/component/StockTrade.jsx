import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const StockTrade = ({ show, handleClose, title, price , modeltype}) => {
    const [amount, setAmount] = useState(25000);
    const [quantity, setQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(quantity* price);

    useEffect(() => {
        const getWalletMoney = async () => {
            try {
                const response = await fetch(`https://stocktrader.site/portfolio/money`);
                const details = await response.json();
                setAmount(parseInt(details.totalAmount));
            } catch (error) {
                console.error("API Call to check stock exists in watchlist or not is failed, error:", error);
            }
        };
        if (show) {
            getWalletMoney();
        }
    }, [show]);

    const checkStockPrice = (e) => {
        const newQuantity = parseInt(e.target.value);
        setQuantity(newQuantity);
        const newTotalAmount = newQuantity * price;
        setTotalAmount(newTotalAmount);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex flex-column'>
                <span>Current Price:  {price}</span>
                <span>wallet In Price: {amount}</span>
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="quantity" className="col-form-label">Quantity</label>
                    </div>
                    <div className="col-auto">
                        <input type="number" id="quantity" className="form-control" min={1} onChange={(e) => checkStockPrice(e)} value={quantity} aria-describedby="passwordHelpInline" />
                    </div>
                    {
                        totalAmount > amount &&  modeltype === "Buy" ? <span key="error-message" className='text-red'> Not enough money in wallet</span> : null
                    }
                </div>
            </Modal.Body>
            <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className='text-start'> Total: {totalAmount || 0} </span>
                <Button disabled ={totalAmount > amount &&  modeltype === "Buy"} variant="primary" onClick={() => handleClose(quantity, totalAmount, price)}>
                 {modeltype} 
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default StockTrade;
