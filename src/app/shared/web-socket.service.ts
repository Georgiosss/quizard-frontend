import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { config } from '../config';
import { TttComponent } from '../ttt/ttt.component';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
    topic: string = "/topic/game/";
    stompClient: any;
    endpoint: string = config.apiUrl;
    webSocketEndPoint: string = `${this.endpoint}/ws`;
    constructor(){
       
    }
    _connect(game: string): any {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        return _this.stompClient; 
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            //this._connect();
        }, 5000);
    }

    onMessageReceived(message: any) {
        console.log("Message Recieved from Server :: " + message);
        //this.appComponent.handleMessage(JSON.stringify(message.body));
    }
}