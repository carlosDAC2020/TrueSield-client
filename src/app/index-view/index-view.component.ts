import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms" 

// componentes 
import {ItemNewComponent} from '../item-new/item-new.component'

// modelos 
import {ItemReddit, ItemRss, ItemX} from '../models/models'


@Component({
  selector: 'app-index-view',
  standalone: true,
  imports: [CommonModule, FormsModule, ItemNewComponent, HttpClientModule],
  templateUrl: './index-view.component.html',
  styleUrl: './index-view.component.css'
})
export class IndexViewComponent {

  is_ti:boolean=true;
  
  constructor(private http: HttpClient, private router: Router ) { }

  // acciones de interactividad
  textInputNew:string=""; // variable manejadora del testo del input 
  validateNews(): void {
    this.router.navigate(['/validation', { prompt: this.textInputNew }]);
  }

  videoUrls: string[] = [
    '../../assets/hero1.mp4',

    '../../assets/hero2.mp4',

    '../../assets/hero3.mp4',

    '../../assets/hero4.mp4'
  ];
  currentVideoIndex: number = 0;
  currentVideoUrl: string = this.videoUrls[this.currentVideoIndex];
  
  placeholderText: string = '';
  phrases: string[] = [
    'Welcome ',
    'We characterize, contrast and validate information',
    'check the facts with us',
    'for example write and validate ...',
    'Intense fighting in eastern Ukraine causes massive displacement of civilians',
    'write your news here...'
  ];
  
  currentPhraseIndex: number = 0;
  typingSpeed: number = 100; // Velocidad de escritura en ms
  delayBetweenPhrases: number = 2000; // Retraso entre frases en ms

  ngOnInit(): void {
    this.startVideoRotation();
    this.typePhrase();
  }

  startVideoRotation() {
    setInterval(() => {
      this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videoUrls.length;
      this.currentVideoUrl = this.videoUrls[this.currentVideoIndex];
    }, 10000); // Cambiar cada 10 segundos
  }

  typePhrase() {
    let currentPhrase = this.phrases[this.currentPhraseIndex];
    let charIndex = 0;
    this.placeholderText = '';

    const typeChar = () => {
      if (charIndex < currentPhrase.length) {
        this.placeholderText += currentPhrase.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, this.typingSpeed);
      } else {
        setTimeout(() => {
          this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
          this.typePhrase();
        }, this.delayBetweenPhrases);
      }
    };

    typeChar();
  }

  stopTutorial(){
    setTimeout(() => {
      this.currentPhraseIndex=0;
    }, 2000); // 3000 milisegundos = 3 segundos
    
  }
}
