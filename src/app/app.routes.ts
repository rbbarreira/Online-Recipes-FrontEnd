import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Online Recipes'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Recipes Details'
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About Us'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login / Register'
    }
];

export default routeConfig;
