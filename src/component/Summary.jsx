// Autocomplete.js

import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import dayjs from 'dayjs';

const Autocomplete = ({data}) => {
  function LATimezonOffset(timestamp) {
    var zone = 'America/Los_Angeles',
      timezoneOffset = -dayjs.tz(timestamp, zone).utcOffset();
  
    return timezoneOffset;
  }
  const chartData = {
    "ticker": "AAPL",
    "queryCount": 21,
    "resultsCount": 21,
    "adjusted": true,
    "results": [
        {
            "v": 40962046,
            "vw": 188.3032,
            "o": 189.385,
            "c": 188.32,
            "h": 189.535,
            "l": 187.35,
            "t": 1707368400000,
            "n": 521464
        },
        {
            "v": 45155216,
            "vw": 189.0056,
            "o": 188.65,
            "c": 188.85,
            "h": 189.99,
            "l": 188,
            "t": 1707454800000,
            "n": 544714
        },
        {
            "v": 41781934,
            "vw": 187.5914,
            "o": 188.415,
            "c": 187.15,
            "h": 188.67,
            "l": 186.79,
            "t": 1707714000000,
            "n": 585515
        },
        {
            "v": 56529529,
            "vw": 185.0421,
            "o": 185.77,
            "c": 185.04,
            "h": 186.21,
            "l": 183.5128,
            "t": 1707800400000,
            "n": 644015
        },
        {
            "v": 54617917,
            "vw": 183.6207,
            "o": 185.32,
            "c": 184.15,
            "h": 185.53,
            "l": 182.44,
            "t": 1707886800000,
            "n": 679072
        },
        {
            "v": 65434496,
            "vw": 182.8487,
            "o": 183.55,
            "c": 183.86,
            "h": 184.49,
            "l": 181.35,
            "t": 1707973200000,
            "n": 756083
        },
        {
            "v": 49752465,
            "vw": 182.7317,
            "o": 183.42,
            "c": 182.31,
            "h": 184.85,
            "l": 181.665,
            "t": 1708059600000,
            "n": 611770
        },
        {
            "v": 53574453,
            "vw": 181.1005,
            "o": 181.79,
            "c": 181.56,
            "h": 182.43,
            "l": 180,
            "t": 1708405200000,
            "n": 712335
        },
        {
            "v": 41496371,
            "vw": 181.9941,
            "o": 181.94,
            "c": 182.32,
            "h": 182.8888,
            "l": 180.66,
            "t": 1708491600000,
            "n": 522492
        },
        {
            "v": 52284192,
            "vw": 183.8372,
            "o": 183.48,
            "c": 184.37,
            "h": 184.955,
            "l": 182.46,
            "t": 1708578000000,
            "n": 613892
        },
        {
            "v": 44926677,
            "vw": 182.9876,
            "o": 185.01,
            "c": 182.52,
            "h": 185.04,
            "l": 182.23,
            "t": 1708664400000,
            "n": 549250
        },
        {
            "v": 40867421,
            "vw": 181.3213,
            "o": 182.24,
            "c": 181.16,
            "h": 182.76,
            "l": 180.65,
            "t": 1708923600000,
            "n": 615639
        },
        {
            "v": 54318851,
            "vw": 181.8192,
            "o": 181.1,
            "c": 182.63,
            "h": 183.9225,
            "l": 179.56,
            "t": 1709010000000,
            "n": 669751
        },
        {
            "v": 48943139,
            "vw": 181.1915,
            "o": 182.51,
            "c": 181.42,
            "h": 183.12,
            "l": 180.13,
            "t": 1709096400000,
            "n": 596442
        },
        {
            "v": 136682597,
            "vw": 180.6781,
            "o": 181.27,
            "c": 180.75,
            "h": 182.57,
            "l": 179.53,
            "t": 1709182800000,
            "n": 813073
        },
        {
            "v": 73450582,
            "vw": 179.0322,
            "o": 179.55,
            "c": 179.66,
            "h": 180.53,
            "l": 177.38,
            "t": 1709269200000,
            "n": 911077
        },
        {
            "v": 81505451,
            "vw": 174.8938,
            "o": 176.15,
            "c": 175.1,
            "h": 176.9,
            "l": 173.79,
            "t": 1709528400000,
            "n": 1167166
        },
        {
            "v": 94702355,
            "vw": 170.3234,
            "o": 170.76,
            "c": 170.12,
            "h": 172.04,
            "l": 169.62,
            "t": 1709614800000,
            "n": 1108820
        },
        {
            "v": 68568907,
            "vw": 169.5506,
            "o": 171.06,
            "c": 169.12,
            "h": 171.24,
            "l": 168.68,
            "t": 1709701200000,
            "n": 896297
        },
        {
            "v": 71763761,
            "vw": 169.3619,
            "o": 169.15,
            "c": 169,
            "h": 170.73,
            "l": 168.49,
            "t": 1709787600000,
            "n": 825405
        },
        {
            "v": 76267041,
            "vw": 171.5322,
            "o": 169,
            "c": 170.73,
            "h": 173.7,
            "l": 168.94,
            "t": 1709874000000,
            "n": 925213
        }
    ],
    "status": "DELAYED",
    "request_id": "80b5ee3fda6e153877d727fb2a048984",
    "count": 21
};
let dailyChartOptions = {
  series: [
    {
      data: [],
      color: "",
      showInNavigator: true,
      name: data[0].ticker?.toUpperCase(),
      type: 'line',
      tooltip: {
        valueDecimals: 2,
      },
    },
  ],
  title: { text: data[0].ticker?.toUpperCase() },
  rangeSelector: {
    enabled: false,
  },
  navigator: {
    series: {
      type: 'area',
      color: "",
      fillOpacity: 1,
    },
  },
  time: {
    getTimezoneOffset: LATimezonOffset,
  },
}; 
  const [companyPeers, setCompanyPeers] = useState([]);
  useEffect(() => {
    const getCompanyPeers = async (ticker) => {
      try {
        const response = await fetch(`https://stocktrader.site/company-peers/${ticker}`);
        if (!response.ok) {
          throw new Error('Failed to fetch company peers');
        }
        const peers = await response.json();
        setCompanyPeers(peers);
        console.log("Company peers:", peers);
      } catch (error) {
        console.error('Error fetching company peers:', error.message);
      }
    };
  
    if (data.length > 0 && data[0].ticker) {
      getCompanyPeers(data[0].ticker);
      getdailyChart();
    }
  }, [data]);

  const getdailyChart =  () =>{
    const apiKey = 'your_api_key';
const ticker = 'AAPL'; // Example ticker symbol

// Calculate the start and end dates
const today = new Date();
const endDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
const startDate = new Date(today);
startDate.setDate(today.getDate() - 30); // Fetch data for the last 30 days
const startDateFormatted = startDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

// Construct the URL for the daily charts endpoint
const url = `https://stocktrader.site/charts/${data[0].ticker}/${startDateFormatted}/${endDate}/1/day`;

// Make a GET request to the Polygon API
// fetch(url)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     console.log( response.json());
//   })
//   .then(data => {
//     console.log('Daily charts data:', data);
//     // Process the data as needed
//   })
//   .catch(error => {
//     console.error('Error fetching daily charts data:', error);
//   });

  // split the data set into close and volume
let    dataLength = chartData.resultsCount;
  let i, intTimestamp;

  for (i = 0; i < dataLength; i += 1) {
    dailyChartOptions.series[0].data.push([chartData.results[i].t, chartData.results[i].c]);
  }
  dailyChartOptions.navigator.series.color = "green";
  dailyChartOptions.series[0].color ="green";
  console.log("dddd", dailyChartOptions);

// required

  }

  
  return (
        <div className="row flex-row mt-4">
          <div className="col-sm-6">
            <div className="row ml-1">
              <div className="container" style={{padding: "0 8rem"}}>
                <p className="m-0">High Price:&#160; {data[1].h }</p>
                <p className="m-0">Low Price:&#160;&#160; { data[1].l }</p>
                <p className="m-0">Open Price: { data[1].o }</p>
                <p className="m-0">Prev. Close: { data[1].pc }</p>
                
              </div>
            </div>
            <div className="mt-5 d-flex flex-column align-items-center justify-content-center">
            <h2>About Company</h2>
            <p> IPO Start Date: {  data[0].ipo }</p>
            <p> Industry: {  data[0].finnhubIndustry }</p>
            <p> Webpage: <a href={  data[0].weburl } target="_blank" rel="noopener noreferrer">{  data[0].weburl }</a> </p>
            <h2  >Company Peers</h2>
            <span className='d-flex flex-row align-items-center'>
            {
              companyPeers?.map((peer, index)=>{ return <> <a key={index} className='ml-2' href={`http://localhost:3000/search/${peer}`}  rel="noopener noreferrer">{peer}</a>,</>})
            }

            </span>
            {/* <p className="row">  {  data[0].ipo }</p> */}
            </div>
          </div>

          <div className="col-sm-6"> {
            dailyChartOptions.series[0].data ?
            <highcharts-chart

    Highcharts={Highcharts}
              constructorType="stockChart"
              options={dailyChartOptions}
            >
            </highcharts-chart>: null
          }
            
          </div>
        </div>
  );
};

export default Autocomplete;
