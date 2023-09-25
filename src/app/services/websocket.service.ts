import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService2 {
  public myWebSocket!: WebSocketSubject<any>;
  public messages$!: Observable<any>;

  constructor() {
  }

  public connect(url) {
    this.myWebSocket = webSocket({
      url,
      openObserver: {
        next: (val: any) => {
          console.log('opened');
          localStorage.setItem('opened', 'true');
        }
      },
      closeObserver: {
        next: (val: any) => {
          console.log(' close');
          localStorage.setItem('opened', 'false');
        }
      },
      deserializer: ({data}) => data
    });
    this.messages$ = this.myWebSocket.asObservable();
  }

  public connectProtocol(url) {
    this.myWebSocket = webSocket({
      url,
      openObserver: {
        next: (val: any) => {
          console.log(val);
          console.log('opened');
        }
      },
      deserializer: ({data}) => data
    });
    this.messages$ = this.myWebSocket.asObservable();
  }

  public emit(eventName: string, data: any) {
    this.myWebSocket.next({[eventName]: data});
  }

  public emit2(data) {
    this.myWebSocket.next(data);
  }

  public send(data: any) {
    this.myWebSocket.next(data);
  }

  public closeConnection() {
    // this.myWebSocket.unsubscribe();
  }
}
