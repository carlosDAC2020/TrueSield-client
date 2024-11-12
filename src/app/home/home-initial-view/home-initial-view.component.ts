import { Component } from '@angular/core';

import { SendValidComponent } from '../../forms/send-valid/send-valid.component';

@Component({
  selector: 'app-home-initial-view',
  standalone: true,
  imports: [SendValidComponent],
  templateUrl: './home-initial-view.component.html',
  styleUrl: './home-initial-view.component.css'
})
export class HomeInitialViewComponent {

}
