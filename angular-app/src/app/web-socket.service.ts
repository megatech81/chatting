import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient;

  constructor() { }

  connect() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify({ content: message }));
  }

  subscribeToMessages(callback) {
    this.stompClient.subscribe('/topic/public', message => {
      console.log('Received message: ' + message.body);
      // Handle incoming message
      callback(JSON.parse(message.body));
    });
  }
}
