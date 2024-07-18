import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

// servicio de autenticacion 
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-user.component.html',
  styleUrl: './auth-user.component.css'
})
export class AuthUserComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }


  // propiedades 
  isRegister:boolean=false; // estado de registro
  auth:any={ // cabecera de autenticacion y registro de usuarios
    "username": "",
    "password": "",
    "email": "",
    "first_name": "",
    "last_name": ""
  };
  rep_password:string="";



  register(){
    if(this.isRegister==false){
      this.isRegister=true;
    }
    else{
      // logica del servicio para el registro y el login
      this.authService.registerUser(this.auth).subscribe(response => {
        if (response && response.token) {
          this.authService.setToken(response.token);
          this.router.navigate(['/home']);
        }
      }, error => {
        console.error('Login error', error);
      });
    }
  }
  login(){
  
    // uso del servicio para el login
    const user:any={
      "username": this.auth.username,
      "password": this.auth.password,
    }
    this.authService.login(user).subscribe(response => {
      if (response && response.token) {
        this.authService.setToken(response.token);
        this.router.navigate(['/home']);
      }
    }, error => {
      console.error('Login error', error);
    });
  }
}
