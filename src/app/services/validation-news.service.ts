import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationNewsService {

  constructor(private http: HttpClient) { }

  getNews(prompt: string): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:8000/valid_news/`, { 'prompt':prompt });
  }
}
