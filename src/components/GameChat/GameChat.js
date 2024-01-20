import React, { useEffect } from 'react';
import * as StompJs from "@stomp/stompjs";
import $ from 'jquery';
import '../../assets/styles/GameChat.css';

const stompClient = new StompJs.Client({
  brokerURL: 'ws://localhost:8080/websocket'
});

function GameChat(props) {

  useEffect(() => {
    // 페이지 들어오면 바로 연결
    stompClient.activate();
  
    // 컴포넌트가 언마운트되거나 재렌더링될 때 실행되는 코드
    return () => {
      // 컴포넌트가 언마운트되거나 재렌더링될 때 websocket disconnect
      stompClient.deactivate();
    };
  }, []);

  const appendMessage = (message) => {
    $("#messages").append("<tr><td>" + message + "</td></tr>");
  }

  //websocket connection 요청
  stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);

    //websocket connection 성공 후, /topic/gameId 구독
    stompClient.subscribe(`/topic/${props.gameId}`, (message) => {
      appendMessage(JSON.parse(message.body).content);
    });
  };

  stompClient.onDisconnect = (frame) => {
    console.log('Disconnected: ' + frame);
  };

  const sendMessage = () => {
    stompClient.publish({
      destination: `/app/gameChat/${props.gameId}`,
      body: JSON.stringify({'message': $("#message").val()})
    });
  };
  
  //websocket connect - 페이지 들어오면 바로 연결
  // stompClient.activate();

  return(
    <div id="main-content" className="container">
      <div className="row">
        <div className="col-md-6">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="message">채팅입력   </label>
              <input type="text" id="message" className="form-control"/>
              <button className="btn btn-default" type="button" onClick={sendMessage}>Send</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table id="conversation" className="table table-striped">
            <thead>
            <tr>
              <th>Messages</th>
            </tr>
            </thead>
            <tbody id="messages">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default GameChat;