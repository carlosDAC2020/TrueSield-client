import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
// vistas
import {IndexViewComponent} from './index-view/index-view.component'
import { HomeComponent } from './home/home.component';
import { HomeInitialViewComponent } from './home/home-initial-view/home-initial-view.component';
import { ValidViewComponent } from './valid-view/valid-view.component';

export const routes: Routes = [
    { path: 'index', 
        component: IndexViewComponent, 
        data: { animation: 'IndexPage' }},
    {
        path: 'home',
        component: HomeComponent,
        children: [
            {   path: '', 
                component: HomeInitialViewComponent, 
                canActivate: [AuthGuard], }, // Ruta predeterminada para /home
            {   path: 'validate',  
                component: ValidViewComponent, 
                canActivate: [AuthGuard],  }, // Ruta para /home/validate
        ]
    },
    { path: '', redirectTo: '/index', pathMatch: 'full' }
];
