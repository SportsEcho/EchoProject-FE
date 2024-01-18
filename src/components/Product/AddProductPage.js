import React, {useState} from 'react';
import axios from 'axios';
import '../../assets/styles/ProductPage.css';

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
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/products`, productData);
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
        <div className="form-container">
        <form onSubmit={handleSubmit} className="add-product-form">
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
      </div>
  );
}

export default AddProductPage;