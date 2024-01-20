import React from 'react';
import * as StompJs from "@stomp/stompjs";

import $ from 'jquery';

import '../../assets/styles/GameChat.css';

const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/websocket'
});

//해당 함수가 실행되면 onConnect 함수 실행
function connect() {
    stompClient.activate();
}
  
//websocket connection 요청
stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);

    //websocket connection 성공 후, /topic/greetings 구독
    stompClient.subscribe('/topic/greetings', (greeting) => {
        showGreeting(JSON.parse(greeting.body).content);
    });
};
  
stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};
  
stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};
  
function sendName() {
    stompClient.publish({
    destination: "/app/hello",
    body: JSON.stringify({'name': $("#name").val()})
    });
}
  
function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
  $( "#send" ).click(() => sendName());
});

function GameChat() {

  //websocket connect - 페이지 들어오면 바로 연결
  var run = false;

  if(run) {
    connect();
  }

  return(
    <div id="main-content" className="container">
      <div className="row">
        <div className="col-md-6">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="name">채팅입력   </label>
              <input type="text" id="name" className="form-control" placeholder="Your name here..."/>
              <button id="send" className="btn btn-default" type="button">Send</button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table id="conversation" className="table table-striped">
            <thead>
            <tr>
              <th>Greetings</th>
            </tr>
            </thead>
            <tbody id="greetings">
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
};

export default GameChat;