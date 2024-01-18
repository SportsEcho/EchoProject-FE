import React, { useState } from 'react';
import axios from 'axios';

function AddHotdeal() {
  const [hotdealData, setHotdealData] = useState({
    title: '',
    description: '',
    sale: 0,
    // 여기에 필요한 다른 핫딜 데이터 필드 추가
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/hotdeals`, hotdealData);
      alert('핫딜이 추가되었습니다.');
    } catch (error) {
      console.error("Error adding hotdeal", error);
    }
  };

  const handleInputChange = (event) => {
    setHotdealData({ ...hotdealData, [event.target.name]: event.target.value });
  };

  return (
      <div>
        <h1>핫딜 추가</h1>
        <form onSubmit={handleSubmit}>
          <input
              name="title"
              value={hotdealData.title}
              onChange={handleInputChange}
              placeholder="핫딜 제목"
          />
          <textarea
              name="description"
              value={hotdealData.description}
              onChange={handleInputChange}
              placeholder="핫딜 설명"
          />
          <input
              name="sale"
              type="number"
              value={hotdealData.sale}
              onChange={handleInputChange}
              placeholder="할인율"
          />
          {/* 여기에 필요한 다른 핫딜 데이터 입력 필드 추가 */}
          <button type="submit">핫딜 추가</button>
        </form>
      </div>
  );
}

export default AddHotdeal;
