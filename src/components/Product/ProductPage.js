import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/styles/ProductPage.css';
import { throttle } from 'lodash';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const itemsPerPage = 20;
  const [hasMore, setHasMore] = useState(true);

  // 의존성 배열에서 `currentPage`를 제거합니다.
  const fetchProducts = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const headers = {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
        'If-Modified-Since': '0'
      };
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`, {
        params: {
          page: page,
          limit: itemsPerPage
        },
        headers
      });
      const newProducts = response.data || [];
      if (newProducts.length < itemsPerPage) {
        setHasMore(false);
      }
      return newProducts;
    } catch (error) {
      setError('상품을 불러오는 데 실패했습니다.');
      console.error("Error fetching products", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage]); // `currentPage`를 제거했습니다.

  useEffect(() => {
    fetchProducts(currentPage).then(newProducts => {
      setProducts(prevProducts => [...prevProducts, ...newProducts]);
    });
  }, [currentPage, fetchProducts]);

  // `handleScroll` 콜백을 `useEffect` 내부에서 정의합니다.
  useEffect(() => {
    const throttledHandleScroll = throttle(() => {
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight || isLoading || !hasMore) {
        return;
      }
      setCurrentPage(prevPage => prevPage + 1);
    }, 200);

    window.addEventListener('scroll', throttledHandleScroll);

    return () => {
      throttledHandleScroll.cancel();
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [isLoading, hasMore]); // 의존성 배열에서 `throttle` 함수를 제거하고 `isLoading`, `hasMore`를 추가했습니다.

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div className="product-page">
        <h1>상품 목록</h1>
        <div className="add-button-container">
          <Link to="/add-product" className="btn btn-primary">상품 추가</Link>
        </div>
        <div className="product-list">
          {products.map(product => (
              <div key={product.id} className="product">
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrlList[0]} alt={product.title} />
                </Link>
                <h2>{product.title}</h2>
                <p>{product.content}</p>
                <p>가격: {product.price}원</p>
              </div>
          ))}
          {isLoading && <div>Loading more products...</div>}
        </div>
      </div>
  );
}

export default ProductPage;