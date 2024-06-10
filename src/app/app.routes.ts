import { Routes } from '@angular/router';
// vistas
import {IndexViewComponent} from './index-view/index-view.component'
import {ValidViewComponent} from './valid-view/valid-view.component'
import {SearchNewsViewComponent} from './search-news-view/search-news-view.component'

export const routes: Routes = [
    { path: 'index', 
        component: IndexViewComponent,
        data: {animation: 'IndexPage'}},
    { path: 'validation', 
        component: ValidViewComponent,
        data: {animation: 'ValidPage'} },
    { path: 'news-now', 
        component: SearchNewsViewComponent,
        data: {animation: 'SearchPage'} },
    { path: '', redirectTo: '/index', pathMatch: 'full' } 
];
