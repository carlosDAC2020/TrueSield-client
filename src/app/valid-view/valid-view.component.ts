import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

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

  
  
  // Manejo de renderizado según el tamaño de dispositivo
  isSmallScreen!: boolean;

  newInput: string = "";
  idValidation!: any;
  newsReference: any;

  itemsReference:any=[];
  characterisrics:any=[];
  report:any;
  veracity: number=0;
  cantItems:any;

  status:boolean=true;
  
  constructor(
    private modelFilterService: FilterListService,
    private webSocketService: WebsocketService,
    private user:UserService,
    private route: ActivatedRoute) {
    console.log("vista de validacion");
    console.log(this.idValidation)
    // Obteniendo el tamaño de pantalla
    this.checkScreenSize();
  }

  ngOnInit() {
    // Suscribirse a los cambios de los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      this.newInput = params['news'];
      this.idValidation = params['idValid'];
      
      if (this.idValidation >= 0) {
        this.loadValidationDetails(this.idValidation);
      } else {
        this.startValidationProcess(this.newInput);
      }
    });
  }

  loadValidationDetails(id: any) {
    this.user.ValidationsDetail(id).subscribe(
      (response: any) => {
        this.newInput = response.validation.prompt;
        this.characterisrics = response.validation.characterisrics;
        this.veracity = response.validation.veracity;
        this.cantItems = response.validation.cantitems;
        this.itemsReference = response.validation.list_items;
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  startValidationProcess(input: string) {
    this.webSocketService.connect().subscribe(
      (message: any) => {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);
        // Envía el token y el prompt si las características no han sido establecidas
        if ( parsedMessage.message==="ok" ) {
          console.log("envio de prompt y token ");
          const token = localStorage.getItem('token');
          const data = { prompt: input, token: token };
          this.webSocketService.sendMessage(data);
        }
  
        if (parsedMessage.capa === "caracterizacion") {
          console.log("caracterizacion recibida");
          this.characterisrics = parsedMessage.characterisrics;
          console.log(this.characterisrics);
          this.status = false;
        } else if (parsedMessage.capa === "terminar") {
          this.webSocketService.close(); // Cerrar la conexión al finalizar
        } else if(parsedMessage.item) {
          console.log("recepciond e item ");
          console.log(parsedMessage.item);
          this.itemsReference.push(parsedMessage.item);
          this.veracity = parsedMessage.report.veracity;
          this.cantItems = parsedMessage.cant_items;
        }
      },
      (error) => {
        console.error("Error al recibir el mensaje WebSocket:", error);
      }
    );
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
  typeItemFilter: string[] = ["Rss", "Reddit", "X"];
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
        const index = this.typeItemFilter.indexOf("Rss");
        if (index !== -1) {
          this.typeItemFilter.splice(index, 1);
        }
        this.isfilterRss = 0;
      } else {
        if (!this.typeItemFilter.includes("Rss")) {
          this.typeItemFilter.push("Rss");
        }
        this.isfilterRss = 1;
      }
    } else if (type === 2) {
      if (this.isfilterX === 1) {
        const index = this.typeItemFilter.indexOf("X");
        if (index !== -1) {
          this.typeItemFilter.splice(index, 1);
        }
        this.isfilterX = 0;
      } else {
        if (!this.typeItemFilter.includes("X")) {
          this.typeItemFilter.push("X");
        }
        this.isfilterX = 1;
      }
    } else {
      if (this.isfilterReddit === 1) {
        const index = this.typeItemFilter.indexOf("Reddit");
        if (index !== -1) {
          this.typeItemFilter.splice(index, 1);
        }
        this.isfilterReddit = 0;
      } else {
        if (!this.typeItemFilter.includes("Reddit")) {
          this.typeItemFilter.push("Reddit");
        }
        this.isfilterReddit = 1;
      }
    }
    console.log(this.typeItemFilter);
    this.filterByType();
  }
}
