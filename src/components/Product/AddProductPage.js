import React, {useState} from 'react';
import axios from 'axios';
import './ProductPage.css';

function AddProductPage() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/products', productData);
      alert('상품이 추가되었습니다.');
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const handleInputChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  return (
      <div>
        <h1>상품 추가</h1>
        <form onSubmit={handleSubmit}>
          <input
              name="name"
              value={productData.name}
              onChange={handleInputChange}
              placeholder="상품 이름"
          />
          <textarea
              name="description"
              value={productData.description}
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
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleInputChange}
              placeholder="이미지 URL"
          />
          <button type="submit">상품 추가</button>
        </form>
      </div>
  );
}

export default AddProductPage;