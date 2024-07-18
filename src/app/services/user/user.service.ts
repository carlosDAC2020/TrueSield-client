import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:8000/auth';
  
  // Crear las cabeceras con el token de autenticación
  private headers = new HttpHeaders({
    'Authorization': `Token ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient) { }

  profile(){
    return this.http.get(`${this.apiUrl}/user/`, {headers: this.headers});
  }

  historyValidations(){
    return this.http.get(`${this.apiUrl}/history/`, {headers: this.headers});
  }

  ValidationsDetail(id:any){
    return this.http.get(`${this.apiUrl}/validation/${id}/`, {headers: this.headers});
  }
}
