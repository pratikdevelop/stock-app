// Autocomplete.js

import React, { useEffect, useState } from 'react';

const Insignhts = ({ ticker }) => {

  console.log(ticker);
  const [settlement, setSetlement] = useState([])

  useEffect(() => {
    const getInsightSettlement = async () => {
      try {
        const response = await fetch(`https://stocktrader.site/insight-settlement/${ticker.ticker}`);
        const details = await response.json();
        setSetlement(details);
      } catch (error) {

      }
    }
    getInsightSettlement();
  }, [ticker.ticker])



  return (
    <div className='d-flex flex-column flex-auto position-relative'>
      <div className='d-flex flex-column mx-auto mt-3'>
        <h4 className='text-center'>Insider Sentiments</h4>
        <table className="table fs-6">
          <thead>
            <tr>
              <th scope="col">{ticker.exchange}</th>
              <th scope="col">MSPR</th>
              <th scope="col">Change</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total</td>
              <td>{settlement.totalMsrp?.toFixed(2)}</td>
              <td>{settlement.totalChange?.toFixed(2)}</td>

            </tr>
            <tr>
              <td>Positive</td>
              <td>{settlement.postivveMspr?.toFixed(2)}</td>
              <td>{settlement.postivvechange?.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Negative</td>
              <td>{settlement.negativeMspr?.toFixed(2)}</td>
              <td>{settlement.negativeChange?.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Insignhts;
