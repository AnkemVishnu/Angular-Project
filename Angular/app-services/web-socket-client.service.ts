import { Injectable } from '@angular/core';
import { SessionStatic } from './SessionStatic';
import { ResponseModel } from '../app-pojo/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class WebSocketClientService {

  webSocket: WebSocket;

  constructor() {
    this.webSocket = null;
  }

  private uniqueID() {
    var uniqueID = "";
    var possible = "ABCDEFGHIkLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 10; i++) {
      uniqueID += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return uniqueID;
  }

  private getServerUrl() {
    
    var socketURL = "ws://159.65.146.244:8080/vgwappws/crossweblogin/";
    
    // var socketURL = "ws://localhost:8084/vgwappws/crossweblogin/";

    return socketURL + this.uniqueID();
  }

  public connect() {
    try {
      this.webSocket = new WebSocket(this.getServerUrl());

      this.webSocket.onopen = function (event) {
        // console.log('onopen::' + JSON.stringify(event, null, 4));
      }

      this.webSocket.onmessage = function (event) {
        // console.log('onmessage::' + JSON.stringify(msg, null, 4));
        sessionStorage.setItem(SessionStatic.crosslogin, event.data);
      }

      this.webSocket.onclose = function (event) {
        // console.log('onclose::' + JSON.stringify(event, null, 4));
      }

      this.webSocket.onerror = function (event) {
        // console.log('onerror::' + JSON.stringify(event, null, 4));
      }
    } catch (exception) {
      console.error(exception);
    }
  }

  public getStatus() {
    return this.webSocket.readyState;
  }

  public send(message) {
    if (this.webSocket.readyState == WebSocket.OPEN) {
      this.webSocket.send(message);
    } else {
      // console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
    }
  }

  public recieve() {
    if (this.webSocket.readyState == WebSocket.OPEN) {
      this.webSocket.onmessage = function (event) {
        // console.log('onmessage::' + JSON.stringify(msg, null, 4));
        sessionStorage.setItem(SessionStatic.loginsuccess, event.data);
      }
    } else {
      // console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
    }
  }

  public disconnect() {
    if (this.webSocket.readyState == WebSocket.OPEN) {
      this.webSocket.close();
    } else {
      // console.error('webSocket is not open. readyState=' + this.webSocket.readyState);
    }
  }

}

export class Messenger {

  statusCode: Number;
  message: String;
  session: String;
  uniqueId: String;
  response: ResponseModel;

  constructor(statusCode, message, session, uniqueId, response) {
    this.statusCode = statusCode;
    this.message = message
    this.session = session
    this.uniqueId = uniqueId
    this.response = response
  }

}