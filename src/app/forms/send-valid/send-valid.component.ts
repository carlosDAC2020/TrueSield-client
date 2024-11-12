import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-valid',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-valid.component.html',
  styleUrl: './send-valid.component.css'
})
export class SendValidComponent {

  // input de validacion 
  inputNew:string="";
  // Variables para almacenar los valores de los rangos
  rangeConfidenceValue: number = 0;
  rangeContextValue: number = 0;
  rangeInferenceValue: number = 0;

  // Variable para controlar el tipo de ítem seleccionado
  selectedItemType: string = 'RSS';


  constructor(private router: Router) { 
    this.setDefaults(this.selectedItemType);
  }

  validateNews() {
    // Navegar a la vista de validación y pasar el valor del input
    this.router.navigate(['/home/validate'], { queryParams: { news: this.inputNew } });
  }

   // mostrar menu de customizacion de parametros 
   showConfigMenu = false;
   toggleConfigMenu() {
     this.showConfigMenu = !this.showConfigMenu;
   }
     
    // Definir pesos para cada tipo de ítem
    
   pesos : any = {
     'RSS': {'w_C': 0.4, 'w_F': 0.4, 'w_I': 0.2},
     'Tweet': {'w_C': 0.3, 'w_F': 0.3, 'w_I': 0.4},
     'Reddit': {'w_C': 0.35, 'w_F': 0.35, 'w_I': 0.3}
   };
   

   // Método para actualizar los valores de los controles deslizantes
   setDefaults(itemType: string): void {
     this.selectedItemType = itemType;
     const weights = this.pesos[itemType];

     // Actualizar los valores de los controles deslizantes
     this.rangeConfidenceValue = weights['w_C'] * 100;
     this.rangeContextValue = weights['w_F'] * 100;
     this.rangeInferenceValue = weights['w_I'] * 100;
   }

   // Métodos para manejar los cambios de los rangos
   onRangeConfidenceChange(event: Event): void {
     const inputElement = event.target as HTMLInputElement;
     this.rangeConfidenceValue = parseFloat(inputElement.value);
     this.pesos[this.selectedItemType].w_C = this.rangeConfidenceValue / 100;
   }

   onRangeContextChange(event: Event): void {
     const inputElement = event.target as HTMLInputElement;
     this.rangeContextValue = parseFloat(inputElement.value);
     this.pesos[this.selectedItemType].w_F = this.rangeContextValue / 100;
   }

   onRangeInferenceChange(event: Event): void {
     const inputElement = event.target as HTMLInputElement;
     this.rangeInferenceValue = parseFloat(inputElement.value);
     this.pesos[this.selectedItemType].w_I = this.rangeInferenceValue / 100;
   }
}
