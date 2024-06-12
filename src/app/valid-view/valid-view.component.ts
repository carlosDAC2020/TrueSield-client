import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms" 
import { ActivatedRoute } from '@angular/router';

// componentes
import { ItemNewComponent } from '../item-new/item-new.component';
import { InferenceGrafComponent } from '../grafics/inference-graf/inference-graf.component';
import { InteractionsGrafComponent } from '../grafics/interactions-graf/interactions-graf.component';

// modelos 
import { ItemRss, ItemX, ItemReddit } from '../models/models';

// servicios 
import { ValidationNewsService } from '../services/validation-news.service';
import { FilterListService } from '../services/filter-list.service';

@Component({
  selector: 'app-valid-view',
  standalone: true,
  imports: [ItemNewComponent, CommonModule, FormsModule, InferenceGrafComponent, InteractionsGrafComponent],
  templateUrl: './valid-view.component.html',
  styleUrl: './valid-view.component.css'
})
export class ValidViewComponent {

  // manejo de renderizado segun el tamaño de dispositivo 
  isSmallScreen!: boolean;

  newInput: string="";
  newsReference: any;

  allItems: any;

  // lista de items rss
  itemsRss: ItemRss[] = [
 
  ];

    // lista de items de twiter
  itemsX: ItemX[] = [
    ];
  
    // lista de items de reddit 
  itemsReddit: ItemReddit[] = [
    ];
  

  constructor(
    private route: ActivatedRoute, 
    private valid: ValidationNewsService,
    private modelFilterService: FilterListService) {

    // obtencion del prompt 
    this.route.params.subscribe(params => {
      this.newInput = params['prompt'];
      console.log("prompt: ",this.newInput)
    });

    // llamada a la api de validacion 
    this.ngOnInit()

    // obteniendo el tamaño de pantalla 
    this.checkScreenSize();

  
    
  }

  ngOnInit() {
    
    this.valid.getNews(this.newInput).subscribe(
      response => {
        console.log('Response from API:', response);
        
        // Parse RSS items
        response.news_reference[2].news.forEach((item: any) => {
          console.log(item.id)
          const rssItem: ItemRss = {
            id: parseInt(item.id),
            type_item:"rss",
            page: item.Page,
            datePub: item.DatePublication,
            title: item.Title,
            autor: item.Autor, // assuming Autor is an array
            interctions: item.CantLikes, // assuming CantLikes means interactions
            bodyText: item.BodyText,
            Summary: item.Summary,
            urlAticle: item.Page // assuming Page contains the URL
          };
          this.itemsRss.push(rssItem);
        });

        // Parse Reddit items
        response.news_reference[1].reddit.forEach((item: any) => {
          const redditItem: ItemReddit = {
            id: parseInt(item.Id),
            type_item:"reddit",
            datePub: item.DatePub,
            nameProfile: item.NameProfile,
            titlePub: item.TitlePub,
            textPub: item.TextPub,
            CantUpVotes: item.CantUpVotes, // assuming CantLikes means upvotes
            CantDownVotes: item.CantDownVotes, // assuming CantDislikes means downvotes
            CantShares: item.CantShares
          };
          this.itemsReddit.push(redditItem);
        });

        // Parse X (tweets) items
        response.news_reference[0].tweets.forEach((item: any) => {
          const xItem: ItemX = {
            id: parseInt(item.Id),
            type_item:"x",
            datePub: item.DatePub,
            userPorifle: item.UserProfile,
            nameProfile: item.NameProfile,
            textPub: item.TextPublic,
            cantLkes: item.CantLikes,
            canRetwits: item.CantRetweets,
            cantComents: item.CantComents
          };
          this.itemsX.push(xItem);
        });

        this.allItems = [ ...this.itemsReddit,  ...this.itemsX, ...this.itemsRss];
        
      },
      error => {
        console.error('Error from API:', error);
      }
    );
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 780;
  }

  // interactividad en movil -------------------------------------------------------------------
  inMetrics:boolean=true;

  // efecto veracidad
  veracity:number=30.45
  

  // manejo de filtrado de items 
    // filtrado por texto
  filteredModels: Array<ItemRss | ItemReddit | ItemX> = [];
  textSearch:string="";
  filterByText(): void {
    this.filteredModels = this.modelFilterService.filterByStringAttributes(this.allItems, this.textSearch);
    console.log("filtrado: ", this.filteredModels)
  }

    // filtrado por ietm
  typeItemFilter:string[]=["rss", "reddit", "x"];
  isfilterRss:number=1;
  isfilterReddit:number=1;
  isfilterX:number=1;
  filterByType(): void {
    this.filteredModels = this.modelFilterService.filterByModelType(this.allItems, this.typeItemFilter);
    console.log("filtrado: ", this.filteredModels)
  }
  activeFilterType(type:number):void {
    if (type==1) {
      if (this.isfilterRss==1) {
        const index = this.typeItemFilter.indexOf("rss");
        if (index !== -1) {
          this.typeItemFilter.splice(index, 1);
        }
        this.isfilterRss=0
      }
      else{
        if (!this.typeItemFilter.includes("rss")) {
          this.typeItemFilter.push("rss");
        }
        this.isfilterRss=1
      }
    }
    else if(type==2){
      if (this.isfilterX==1) {
        const index = this.typeItemFilter.indexOf("x");
        if (index !== -1) {
          this.typeItemFilter.splice(index, 1);
        }
        this.isfilterX=0
      }
      else{
        if (!this.typeItemFilter.includes("x")) {
          this.typeItemFilter.push("x");
        }
        this.isfilterX=1
      }
    }
    else{
      if (this.isfilterReddit==1) {
        const index = this.typeItemFilter.indexOf("reddit");
        if (index !== -1) {
          this.typeItemFilter.splice(index, 1);
        }
        this.isfilterReddit=0
      }
      else{
        if (!this.typeItemFilter.includes("reddit")) {
          this.typeItemFilter.push("reddit");
        }
        this.isfilterReddit=1
      }
    }
    console.log(this.typeItemFilter)
    this.filterByType()
  }
}
