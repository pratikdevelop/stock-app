// Autocomplete.js

import React, { useEffect, useState } from 'react';

const Charts = ({ ticker }) => {

  const [CompanyNews, setCompanyNews] = useState({})

  useEffect(() => {
    const getCompanyNews = async () => {
      try {
        const response = await fetch(`https://stocktrader.site/company-news/${ticker}`);
        const details = await response.json();
        setCompanyNews(details);
        console.log("price", CompanyNews);
      } catch (error) {

      }
    }
    getCompanyNews();
  }, [ticker])



  return (
    <div className='d-flex flex-column flex-auto  position-relative search-form'>

    </div>
  );
};

export default Charts;
