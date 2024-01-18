import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function HotdealDetail() {
  const { hotdealId } = useParams();
  const [hotdeal, setHotdeal] = useState(null);

  useEffect(() => {
    const fetchHotdeal = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hotdeals/${hotdealId}`);
        setHotdeal(response.data);
      } catch (error) {
        console.error('Error fetching hotdeal:', error);
      }
    };

    fetchHotdeal();
  }, [hotdealId]);

  if (!hotdeal) return <div>Loading...</div>;

  return (
      <div>
        <h1>{hotdeal.title}</h1>
        <p>{hotdeal.description}</p>
        <p>{hotdeal.sale}% 할인</p>
        {/* 여기에 추가적인 핫딜 정보를 표시 */}
      </div>
  );
}

export default HotdealDetail;
