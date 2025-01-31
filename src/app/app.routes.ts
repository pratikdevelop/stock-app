import { Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { StockDetailComponent } from './pages/stock-detail/stock-detail.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: 'stock/:ticker',
        component: StockDetailComponent
    },
    {
        path: 'signup',
        component: SignupComponent,
    }, 
    {
        path: 'stocks',
        loadComponent: () => import('./stock-listing/stock-listing.component').then(m => m.StockListingComponent)

    }
];
