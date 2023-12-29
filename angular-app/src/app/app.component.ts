import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chat Video App';
  message: string;
  messages: string[] = [];

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.webSocketService.connect();
    this.webSocketService.subscribeToMessages((message) => {
      this.messages.push(message.content);
    });
  }

  sendMessage() {
    this.webSocketService.sendMessage(this.message);
    this.message = '';
  }
}
