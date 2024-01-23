import React, {useState} from 'react';
import axios from 'axios';
import '../../assets/styles/ProductPage.css';

function AddProductPage() {
  const [productData, setProductData] = useState({
    title: '',        // 'name' 대신 'title' 사용
    content: '',      // 'description' 대신 'content' 사용
    price: 0,
    imageUrlList: []  // 'imageUrl' 대신 'imageUrlList' 사용
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // 상품 정보 구조에 맞게 데이터를 조정
      const postData = {
        ...productData,
        imageUrlList: [productData.imageUrlList] // 단일 이미지 URL을 배열로 변환
      };

      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/products`, postData);
      alert('상품이 추가되었습니다.');
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const handleInputChange = (event) => {
    // 'imageUrlList' 필드에 대한 특별한 처리
    if (event.target.name === 'imageUrlList') {
      setProductData({ ...productData, imageUrlList: event.target.value });
    } else {
      setProductData({ ...productData, [event.target.name]: event.target.value });
    }
  };

  return (
      <div>
        <h1>상품 추가</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="add-product-form">
            <input
                name="title" // 필드명 수정
                value={productData.title}
                onChange={handleInputChange}
                placeholder="상품 이름"
            />
            <textarea
                name="content" // 필드명 수정
                value={productData.content}
                onChange={handleInputChange}
                placeholder="상품 설명"
            />
            <input
                name="price"
                type="number"
                value={productData.price}
                onChange={handleInputChange}
                placeholder="가격"
            />
            <input
                name="imageUrlList" // 필드명 수정
                value={productData.imageUrlList}
                onChange={handleInputChange}
                placeholder="이미지 URL"
            />
            <button type="submit">상품 추가</button>
          </form>
        </div>
      </div>
  );
}

export default AddProductPage;