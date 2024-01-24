import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/styles/ProductPage.css';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`, {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });
        if (response.data) {
          setProducts(response.data.data);
          const totalItemsCount = response.data.totalCount;
          setTotalPages(Math.ceil(totalItemsCount / itemsPerPage));
        }
      } catch (error) {
        setError('상품을 불러오는 데 실패했습니다.');
        console.error("Error fetching products", error);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, [currentPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div className="product-page">
        <h1>상품 목록</h1>
        {/* 상품 추가 버튼 */}
        <div className="add-button-container">
          <Link to="/add-product" className="btn btn-primary">상품 추가</Link>
        </div>
        {/* 상품 목록 */}
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
        </div>
        {/* 페이지네이션 */}
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      </div>
  );
}

// 페이지네이션 컴포넌트
const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </button>
        ))}
      </div>
  );
};

export default ProductPage;