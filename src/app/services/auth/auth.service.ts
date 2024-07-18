import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/auth';
  private tokenKey = 'token';

  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, { 
      username: user.username, 
      password: user.password 
    });
  }

  registerUser(newUser: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, {
      username: newUser.username,
      password: newUser.password,
      email: newUser.email,
      first_name: newUser.first_name,
      last_name: newUser.last_name
    });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
