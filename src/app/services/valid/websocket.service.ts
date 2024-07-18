import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  
  constructor() {
    
  }
  
  public connect(param1:string ): Observable<any> {
    const token = localStorage.getItem('token');
    this.socket = new WebSocket(`ws://localhost:8000/ws/valid/${param1}/?token=${token}`);
    return new Observable(observer => {
      this.socket.onmessage = (event) => observer.next(event.data);
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = () => observer.complete();
    });
  }

  public sendMessage(message: string): void {
    this.socket.send(message);
  }

  public close(): void {
    this.socket.close();
  }
}
