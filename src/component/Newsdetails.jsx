// Autocomplete.js

import React, { useEffect, useState } from 'react';
import { BsTwitterX, BsFacebook } from "react-icons/bs";

import dayjs from 'dayjs'

const Newsdetail = ({ ticker }) => {

  const [CompanyNews, setCompanyNews] = useState([])
  const [news, setNews] = useState({})

  useEffect(() => {
    const getCompanyNews = async () => {
      try {
        // Get current date
        const currentDate = new Date();

        // Get the start date of the current month
        const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        // The above line sets the day of the month to 1 (start of the month)

        // Get the end date of the current month
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        const response = await fetch(`https://stocktrader.site/news/${ticker}/${startDate}/${endDate} `);
        const details = await response.json();
        console.log(details);
        setCompanyNews(details);
        console.log("price", CompanyNews);
      } catch (error) {

      }
    }
    getCompanyNews();
  }, [ticker])



  return (
    <div className='d-flex flex-auto position-relative mt-3'>
      <div className="row">
        {CompanyNews.map((news, index) => (
          <div className="col-md-6 col-12" key={index} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setNews(news)}>
            <div className="card mb-3">
              <div className="row g-0 d-flex align-items-center px-4 ">
                <div className="col-md-4">
                  <img className="card-img" height={60} src={news.url || "https://imgs.search.brave.com/65oFsI1cszj1f8cliOT7XOz82gZrC8_J5tjiTZkiRLA/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYyLzkzLzY2/LzM2MF9GXzQ2Mjkz/NjY4OV9CcEVFY3hm/Z011WVBmVGFJQU9D/MXRDRHVybXNubzdT/cC5qcGc"} >
                  </img>
                </div>
                <div className="col-md-8">
                  <div className="card-body" style={{ fontSize: "12px", color: "gray" }}>
                    <p >{news.description.slice(0, 80)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className='d-flex flex-column'>
                <h4 className="modal-title" id="exampleModalLabel"> {news.source} </h4>
                <span className='fs-6  text-secondary'>{dayjs(news.published_date).locale("us").format("MMMM D YYYY ")}</span>
              </div>
            </div>
            <div className="modal-body">
              <h6 className="fs-6" id="exampleModalLabel"> {news.title} </h6>
              <p style={{ fontSize: ".7rem" }} className="text-secondary " id="exampleModalLabel"> {news.description} {news.url ? <a href={news.url} target="_blank" rel="noopener noreferrer">read more</a> : null}   </p>

            </div>
            <div className="card m-2 ">
              <div className="card-body">
                <div className="row mx-1">Share</div>
                <div className="d-flex  p-0 mx-1 align-items-center">
                  <a
                    className="m-0 p-0 d-inline-flex fs-4 twitter-share-button btn btn-social btn-twitter"
                    href={`https://twitter.com/intent/tweet?text=${news.title}&url=${news.url}`}
                    target="_blank"
                    data-size="large"
                  >
                    <BsTwitterX />
                  </a>
                  <div
                    className="m-0 mx-1 p-0 d-inline-flex btn fs-4 fb-share-button"
                    href="https://developers.facebook.com/docs/plugins/"
                    data-layout="button"
                    data-size="large"
                  >
                    <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${news.url}&amp;src=sdkpreparse`} className="fb-xfbml-parse-ignore">
                      <BsFacebook />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

export default Newsdetail;
