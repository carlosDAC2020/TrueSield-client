import { Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// servicios
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-menu-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-actions.component.html',
  styleUrl: './menu-actions.component.css'
})
export class MenuActionsComponent {

  validations:any=[];

  constructor(
    private user:UserService, 
    private router: Router){
    this.user.historyValidations().subscribe(
      (response: any) => {
        this.validations = response.validations;
        console.log(this.validations)
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  validateDetail(idValidate:any){
    // Navegar a la vista de validación y pasar el valor del input
    this.router.navigate(['/home/validate'], { queryParams: { idValid: idValidate } });
  }

  newValidate(){
    this.router.navigate(['/home']);
  }
  
}
