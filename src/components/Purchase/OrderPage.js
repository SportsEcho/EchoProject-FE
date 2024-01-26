import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';

function OrderPage() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const navigate = useNavigate();

  // 구매 처리 함수
  const handlePurchase = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      const purchaseData = { address, phone };

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/purchase`, purchaseData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      alert('주문이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.error("주문 처리 중 오류 발생: ", error);
      alert('주문 처리 중 오류가 발생했습니다.');
    }
  };

  // 주소 처리 함수
  const handleAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setAddress(fullAddress);
    setIsPostcodeOpen(false);
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
            <button type="button" onClick={() => setIsPostcodeOpen(true)}>주소 검색</button>
          </div>
          {isPostcodeOpen && (
              <DaumPostcode
                  onComplete={handleAddress}
                  onClose={() => setIsPostcodeOpen(false)}
                  style={{ display: 'block', position: 'absolute', top: '100px', zIndex: '100' }}
              />
          )}
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
