import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HotdealList() {
  const [hotdeals, setHotdeals] = useState([]);

  useEffect(() => {
    const fetchHotdeals = async () => {
      try {
        const response = await axios.get('${process.env.REACT_APP_API_BASE_URL}/api/products/hotdeals');
        setHotdeals(response.data);
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
                <Link to={`/hotdeals/${hotdeal.id}`}>{hotdeal.title}</Link>
                - {hotdeal.sale}% 할인
              </li>
          ))}
        </ul>
      </div>
  );
}

export default HotdealList;
