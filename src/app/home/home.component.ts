import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
// servicios
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';


// componentes
import { MenuActionsComponent } from '../menu-actions/menu-actions.component';
import { ValidViewComponent } from '../valid-view/valid-view.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, MenuActionsComponent, ValidViewComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    // Manejo de renderizado según el tamaño de dispositivo
  isSmallScreen!: boolean;

    // input de validacion 
    inputNew:string="";

    // estado de validacion y de vista de detalles
    isValid:boolean=false;
    inHome:boolean=true;

    // id de validacion
    idValidation!:any;

    // usuario del perfil 
    user:any;

    constructor(
      private router: Router,
      private auth: AuthService,
      private userService: UserService
    ) { 
      this.userService.profile().subscribe(
        (response: any) => {
          this.user = response.user;
        },
        (error) => {
          console.error(error);
        }
      );

      // Obteniendo el tamaño de pantalla
      this.checkScreenSize();      

      
    }


    checkScreenSize() {
      this.isSmallScreen = window.innerWidth <= 780;
    }
    
    validateNews(){
      this.isValid = true;
      this.inHome = false
    }

    validationDetail(id: any) {
      this.isValid = false;
      setTimeout(() => {
        this.idValidation = id;
        this.isValid = true;
        this.inHome = false;
      }, 50);
    }    
    
    logout(){
      this.auth.logout();
      this.router.navigate(['/index']);
    }

    
  
}
