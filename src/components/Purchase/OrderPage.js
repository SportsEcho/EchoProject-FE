import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

function OrderPage() {
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAddress = (data) => {
    setAddress(data.roadAddress);
    setIsModalOpen(false);
  };

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
                readOnly
            />
            <button type="button" onClick={() => setIsModalOpen(true)}>주소 검색</button>
          </div>
          <div>
            <label htmlFor="detailAddress">상세주소:</label>
            <input
                type="text"
                id="detailAddress"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
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

        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <DaumPostcode onComplete={handleAddress} />
        </Modal>
      </div>
  );
}

export default OrderPage;
