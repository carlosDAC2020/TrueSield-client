import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;

  constructor() {}

  public connect(): Observable<any> {
    this.socket = new WebSocket(`ws://localhost:8000/ws/valid/`);
    return new Observable(observer => {
      this.socket.onopen = () => {
        console.log('Conexión establecida');
      };
      this.socket.onmessage = (event) => observer.next(event.data);
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = () => observer.complete();
    });
  }

  public sendMessage(data: any): void {
    this.socket.send(JSON.stringify(data));
  }

  public close(): void {
    this.socket.close();
  }
}