import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
// vistas
import {IndexViewComponent} from './index-view/index-view.component'
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
    { path: 'index', 
        component: IndexViewComponent, 
        data: { animation: 'IndexPage' }},
    { path: 'home', 
        component: HomeComponent, 
        canActivate: [AuthGuard], 
        data: { animation: 'HomePage' }},
    { path: '', redirectTo: '/index', pathMatch: 'full' }
];
