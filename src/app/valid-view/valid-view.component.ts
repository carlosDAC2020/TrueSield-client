import { Component, HostListener, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms"

// Componentes
import { ItemNewComponent } from '../item-new/item-new.component';
import { InferenceGrafComponent } from '../grafics/inference-graf/inference-graf.component';
import { InteractionsGrafComponent } from '../grafics/interactions-graf/interactions-graf.component';

// Modelos
import { ItemRss, ItemX, ItemReddit } from '../models/models';

// Servicios
import { FilterListService } from '../services/filter/filter-list.service';
import { WebsocketService } from '../services/valid/websocket.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-valid-view',
  standalone: true,
  imports: [ItemNewComponent, CommonModule, FormsModule, InferenceGrafComponent, InteractionsGrafComponent],
  templateUrl: './valid-view.component.html',
  styleUrl: './valid-view.component.css'
})
export class ValidViewComponent  implements OnInit {

  // estado de validacion
  isValid:boolean=true;
  
  // Manejo de renderizado según el tamaño de dispositivo
  isSmallScreen!: boolean;

  @Input() newInput: string = "";
  @Input() idValidation!: any;
  newsReference: any;

  itemsReference:any=[];
  characterisrics:any;
  report:any;
  veracity: number=0;
  cantItems:any;

  status:boolean=true;
  
  constructor(
    private modelFilterService: FilterListService,
    private webSocketService: WebsocketService,
    private user:UserService) {
    console.log(this.idValidation)
    // Obteniendo el tamaño de pantalla
    this.checkScreenSize();
  }

  ngOnInit() {
    if (this.newInput.length>0) {
      console.log("validando")
      // en caso de ser una validacion 
      this.webSocketService.connect(this.newInput).subscribe(
        (message: any) => {
          const parsedMessage = JSON.parse(message);
          
          if (parsedMessage.capa === "caracterizacion") {
            this.characterisrics = parsedMessage.characterisrics;
            this.status = false;
            console.log(this.characterisrics);
          }
          else if(parsedMessage.capa === "terminar"){
            this.webSocketService.close(); // Cerrar la conexión
            console.log("Conexión cerrada");
          }
          else{
            console.log("mensaje recibido ")
            this.itemsReference.push(parsedMessage.item);
            this.veracity=parsedMessage.report.veracity;
            this.cantItems=parsedMessage.cant_items;
            console.log(parsedMessage)
          }
  
        },
        (error) => {
          console.error(error);
        }
      );
    }
    else{
      console.log("mostrando detalles")
      console.log(this.idValidation)
      // en caso de solo ver el detalle de la validacion 
      this.user.ValidationsDetail(this.idValidation).subscribe(
        (response: any) => {
          this.newInput = response.validation.prompt;
          this.characterisrics = response.validation.characterisrics;
          this.veracity=response.validation.veracity;
          this.cantItems=response.validation.cantitems;
          this.itemsReference = response.validation.list_items;
          console.log(response)
        },
        (error) => {
          console.error(error);
        }
      );
    }
    
  }



  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 780;
  }

  // Interactividad en móvil -------------------------------------------------------------------
  inMetrics: boolean = true;

  // Manejo de filtrado de items
  // Filtrado por texto
  filteredModels: Array<ItemRss | ItemReddit | ItemX> = [];
  textSearch: string = "";
  filterByText(): void {
    this.filteredModels = this.modelFilterService.filterByStringAttributes(this.itemsReference, this.textSearch);
    console.log("filtrado: ", this.filteredModels);
  }

  // Filtrado por item
  typeItemFilter: string[] = ["rss", "reddit", "x"];
  isfilterRss: number = 1;
  isfilterReddit: number = 1;
  isfilterX: number = 1;
  filterByType(): void {
    this.filteredModels = this.modelFilterService.filterByModelType(this.itemsReference, this.typeItemFilter);
    console.log("filtrado: ", this.filteredModels);
  }

  activeFilterType(type: number): void {
    if (type === 1) {
      if (this.isfilterRss === 1) {
        const index = this.typeItemFilter.indexOf("rss");
        if (index !== -1) {
          this.typeItemFilter.splice(index, 1);
        }
        this.isfilterRss = 0;
      } else {
        if (!this.typeItemFilter.includes("rss")) {
          this.typeItemFilter.push("rss");
        }
        this.isfilterRss = 1;
      }
    } else if (type === 2) {
      if (this.isfilterX === 1) {
        const index = this.typeItemFilter.indexOf("x");
        if (index !== -1) {
          this.typeItemFilter.splice(index, 1);
        }
        this.isfilterX = 0;
      } else {
        if (!this.typeItemFilter.includes("x")) {
          this.typeItemFilter.push("x");
        }
        this.isfilterX = 1;
      }
    } else {
      if (this.isfilterReddit === 1) {
        const index = this.typeItemFilter.indexOf("reddit");
        if (index !== -1) {
          this.typeItemFilter.splice(index, 1);
        }
        this.isfilterReddit = 0;
      } else {
        if (!this.typeItemFilter.includes("reddit")) {
          this.typeItemFilter.push("reddit");
        }
        this.isfilterReddit = 1;
      }
    }
    console.log(this.typeItemFilter);
    this.filterByType();
  }
}
