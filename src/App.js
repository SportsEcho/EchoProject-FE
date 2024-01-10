import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import './assets/styles/your-style-sheet.css';

function App() {
  return (
      <div>
        <Header />
        <Navigation />
        {/* 기타 메인 콘텐츠 구현 */}
        <Footer />
      </div>
  );
}

export default App;