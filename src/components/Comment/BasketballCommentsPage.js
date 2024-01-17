import React from 'react';
import '../../assets/styles/comment.css';
function BasketballCommentsPage() {
  return (
      <main>
        <section id="basketball-comments">
          <h2>농구 경기 댓글</h2>
          <form id="comment-form">
            <textarea id="comment-text" placeholder="댓글을 입력하세요"></textarea>
            <button type="submit">댓글 작성</button>
          </form>
          <div id="comments-container"></div> {/* 댓글 표시 영역 */}
        </section>
      </main>
  );
}
export default BasketballCommentsPage;
