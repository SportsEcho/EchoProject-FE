import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate import

function OrderPage() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handlePurchase = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('로그인이 필요합니다.');
        return;
      }

      const purchaseData = { address, phone };

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/purchase`, purchaseData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      alert('주문이 완료되었습니다.');
      navigate('/'); // 메인 페이지로 리다이렉트
    } catch (error) {
      console.error("주문 처리 중 오류 발생: ", error);
      alert('주문 처리 중 오류가 발생했습니다.');
    }
  };

  return (
      <div>
        <h1>주문 페이지</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="address">주소:</label>
            <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">전화번호:</label>
            <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button type="submit" onClick={handlePurchase}>구매하기</button>
        </form>
      </div>
  );
}

export default OrderPage;