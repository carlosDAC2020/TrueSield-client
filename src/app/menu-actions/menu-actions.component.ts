import { Component,  Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  constructor(private user:UserService){
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

  
  @Output() idValidate = new EventEmitter<number>();
  validateDetail(idValidate:any){
    this.idValidate.emit(idValidate);
  }

  @Output() isValid = new EventEmitter<boolean>();
  newValidate(){
    this.isValid.emit(true);
  }
}
