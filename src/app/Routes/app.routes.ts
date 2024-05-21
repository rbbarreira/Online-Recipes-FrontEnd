import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { DetailsComponent } from '../Components/details/details.component';
import { AboutComponent } from '../Components/about/about.component';
import { RegisterComponent } from '../Account/register/register.component';
import { authGuard } from '../guard/auth.guard';
import { LoginComponent } from '../Account/login/login.component';
import { UserPainelComponent } from '../Account/users-painel/user.painel.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';

const routeConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'Online Recipes' },   
    { path: 'details/:id', component: DetailsComponent, title: 'Recipes Details' },
    { path: 'about', component: AboutComponent, title: 'About Us' },
    { path: 'login', component: LoginComponent, title: 'Login' },   
    { path: 'register', component: RegisterComponent, title: 'Register' },    
    { path: 'painel', component: UserPainelComponent, title: 'User Painel', canActivate:[authGuard],
        loadChildren: () => import('./user.routes').then((m) => m.routeUser),        
    },
    { path: '**', pathMatch: 'full',  component: NotFoundComponent }, 
];

export default routeConfig;
