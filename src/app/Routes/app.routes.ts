import { Routes } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { DetailsComponent } from '../Components/details/details.component';
import { AboutComponent } from '../Components/about/about.component';
import { RegisterComponent } from '../Account/register/register.component';
import { RecipesEditComponent } from '../Recipes/recipes-edit/recipes-edit.component';
import { authGuard } from '../Account/guard/auth.guard';
import { LoginComponent } from '../Account/login/login.component';
import { UserPainelComponent } from '../Account/user.painel/user.painel.component';

const routeConfig: Routes = [
    {
        path: '', component: HomeComponent, title: 'Online Recipes'
    },
    {
        path: 'home', component: HomeComponent, title: 'Online Recipes'
    },
    {
        path: 'details/:id', component: DetailsComponent, title: 'Recipes Details'
    },
    {
        path: 'about', component: AboutComponent, title: 'About Us'
    },
    {
        path: 'login', component: LoginComponent, title: 'Login'
    },   
    {
        path: 'register', component: RegisterComponent, title: 'Register'        
    },
    {
        path: 'painel', component: UserPainelComponent, title: 'User Painel', canActivate:[authGuard] 
    },
    {
        path: 'recipe', component: RecipesEditComponent, title: 'Recipe', canActivate:[authGuard] 
    }
];

export default routeConfig;
