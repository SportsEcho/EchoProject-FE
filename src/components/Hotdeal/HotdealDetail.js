import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function HotdealDetail() {
  const { hotdealId } = useParams();
  const [hotdeal, setHotdeal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotdeal = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/hotdeals/${hotdealId}`);
        if (response.data && response.data.data) {
          setHotdeal(response.data.data);
        } else {
          console.error("Invalid response structure:", response);
        }
      } catch (error) {
        console.error('Error fetching hotdeal:', error);
      }
    };

    fetchHotdeal();
  }, [hotdealId]);

  const handlePurchase = () => {
    const authToken = localStorage.getItem('authToken'); // 토큰 가져오기
    if (authToken) {
      navigate('/order'); // 로그인 상태이면 OrderPage로 이동
    } else {
      alert('로그인이 필요합니다.'); // 로그인 상태가 아니면 알림 표시
    }
  };

  if (!hotdeal) return <div>Loading...</div>;

  return (
      <div>
        {/* 핫딜 상세 정보 표시 */}
        <h1>{hotdeal.title}</h1>
        <img src={hotdeal.imageUrlList[0]} alt={hotdeal.title} style={{ maxWidth: '300px', maxHeight: '300px' }} />
        <p>{hotdeal.content}</p>
        <p>{hotdeal.sale}% 할인</p>
        <button onClick={handlePurchase}>바로 구매하기</button>
      </div>
  );
}

export default HotdealDetail;