import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/styles/ProductPage.css';

function HotdealList() {
  const [hotdeals, setHotdeals] = useState([]);

  useEffect(() => {
    const fetchHotdeals = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hotdeals`);
        if (response.data && response.data) {
          setHotdeals(response.data);
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error('Error fetching hotdeals:', error);
      }
    };

    fetchHotdeals();
  }, []);

  return (
      <div>
        <h1>핫딜 목록</h1>
        <ul>
          {hotdeals.map(hotdeal => (
              <li key={hotdeal.id}>
                <Link to={`/hotdeals/${hotdeal.id}`}>
                  <img src={hotdeal.imageUrlList[0]} alt={hotdeal.title} style={{ width: '100px', height: '100px' }} />
                  {hotdeal.title}
                </Link>
                - {hotdeal.sale}% 할인
              </li>
          ))}
        </ul>
      </div>
  );
}

export default HotdealList;
