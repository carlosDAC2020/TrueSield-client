import { Component, Input, HostListener } from '@angular/core';
import { InferenceGrafComponent } from '../grafics/inference-graf/inference-graf.component';
import { InteractionsGrafComponent } from '../grafics/interactions-graf/interactions-graf.component';

@Component({
  selector: 'app-item-new',
  standalone: true,
  imports: [InteractionsGrafComponent, InferenceGrafComponent],
  templateUrl: './item-new.component.html' ,
  styleUrl: './item-new.component.css'
})
export class ItemNewComponent {
  @Input() itemNew:any;
  @Input() isValid:any;

  constructor() {
    // obteniendo el tamaño de pantalla 
    this.checkScreenSize();
    
  }


  getDomainFromPage(): string | null {
    if (!this.itemNew.page) {
        return null;
    }

    try {
        const parsedUrl = new URL(this.itemNew.page);
        return parsedUrl.hostname.replace('www.', '');
    } catch (error) {
        console.error('Error parsing URL:', error);
        return null;
    }
  }

  selectedItem: any = null;
  selectItem(item: any) {
    this.selectedItem = item;
  }

  // manejo de renderizado segun el tamaño de dispositivo 
  isSmallScreen!: boolean;
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.checkScreenSize();
  }
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 780;
  }
}

