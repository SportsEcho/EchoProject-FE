import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductPage.css';
import ProductPage from "../../assets/styles/ProductPage.css";
function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
      <div className="product-page">
        <h1>상품 목록</h1>
        <div className="product-list">
          {products.map(product => (
              <div key={product.id} className="product">
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} alt={product.name} />
                </Link>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>가격: {product.price}원</p>
              </div>
          ))}
        </div>
      </div>
  );
}

export default ProductPage;
