import { Routes } from '@angular/router';
import { SuperherosListComponent } from './pages/superheros-list/superheros-list.component';

export const routes: Routes = [
    {
        path:'',
        component: SuperherosListComponent
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
