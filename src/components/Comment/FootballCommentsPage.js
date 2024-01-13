import React from 'react';
import '../../assets/styles/comment.css';
function FootballCommentsPage() {
  return (
      <main>
        <section id="football-comments">
          <h2>축구 경기 댓글</h2>
          <form id="comment-form">
            <textarea id="comment-text" placeholder="댓글을 입력하세요"></textarea>
            <button type="submit">댓글 작성</button>
          </form>
          <div id="comments-container"></div> {/* 댓글 표시 영역 */}
        </section>
      </main>
  );
}
export default FootballCommentsPage;
