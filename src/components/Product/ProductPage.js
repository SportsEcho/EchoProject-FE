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
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = useCallback(async (page, keyword = '') => {
    setIsLoading(true);
    try {
      const params = {
        page: page,
        size: itemsPerPage,
        keyword: keyword
      };
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`, { params });
      const newProducts = response.data || [];
      if (newProducts.length < itemsPerPage) {
        setHasMore(false);
      } else {
      setHasMore(true); // 데이터가 더 있는 경우 hasMore 업데이트
    }
      return newProducts;
    } catch (error) {
      setError('상품을 불러오는 데 실패했습니다.');
      console.error("Error fetching products", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage]);

  useEffect(() => {
    // 페이지 또는 검색어가 변경될 때마다 상품을 불러오도록 수정
    fetchProducts(currentPage, searchTerm).then(newProducts => {
      setProducts(currentPage === 1 ? newProducts : prevProducts => [...prevProducts, ...newProducts]);
    });
  }, [currentPage, searchTerm, fetchProducts]);

  useEffect(() => {
    const checkScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !isLoading && hasMore) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    };

    const throttledHandleScroll = throttle(checkScroll, 200);
    const throttledHandleResize = throttle(checkScroll, 200);

    window.addEventListener('scroll', throttledHandleScroll);
    window.addEventListener('resize', throttledHandleResize);

    return () => {
      throttledHandleScroll.cancel();
      throttledHandleResize.cancel();
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, [isLoading, hasMore]);

  const executeSearch = () => {
    setCurrentPage(1); // 검색 실행 시 페이지를 1로 재설정
    fetchProducts(1, searchTerm).then(newProducts => {
      setProducts(newProducts); // 검색 결과로 상태 업데이트
    });
  };
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };

  const handleSearchClick = () => {
    executeSearch();
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div className="product-page">
        <h1>상품 목록</h1>
        <div className="search-and-sort-container">
          <div className="search-container">
            <input
                type="text"
                placeholder="상품 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchKeyDown}
            />
            <button onClick={handleSearchClick}>검색</button>
          </div>
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
