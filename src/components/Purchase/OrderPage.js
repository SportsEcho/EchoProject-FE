import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';

function OrderPage() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Portal을 위한 div 요소를 생성하고 body에 추가합니다.
    const portalDiv = document.createElement('div');
    portalDiv.id = 'portal';
    document.body.appendChild(portalDiv);
    return () => {
      // 컴포넌트 언마운트 시 portal div 요소를 제거합니다.
      document.body.removeChild(portalDiv);
    };
  }, []);
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
          {isPostcodeOpen && ReactDOM.createPortal(
              <DaumPostcode
                  key={new Date().getTime()}
                  onComplete={handleAddress}
                  onClose={() => setIsPostcodeOpen(false)}
                  style={{ display: 'block', position: 'absolute', top: '100px', zIndex: '100' }}
              />,
              document.getElementById('portal')
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
