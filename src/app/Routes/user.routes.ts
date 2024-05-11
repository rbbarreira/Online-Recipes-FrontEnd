import { Routes } from "@angular/router";
import { UsersComponent } from "../Account/users/users.component";
import { authGuard, authGuardRole } from "../Account/guard/auth.guard";
import { UsersEditComponent } from "../Account/users-edit/users-edit.component";
import { RecipesComponent } from "../Recipes/recipes/recipes.component";
import { RecipesCreateComponent } from "../Recipes/recipes-create/recipes-create.component";

export const routeUser: Routes = [
    
    { path: 'recipe', component: RecipesComponent, title: 'Recipe', canActivate:[authGuard] },
    { path: 'users', component: UsersComponent, title: 'Users', canActivate:[authGuardRole] },
    { path: 'userEdit/:id', component: UsersEditComponent, title: 'Edit Users', canActivate:[authGuardRole] },
    { path: 'recipeCreate', component: RecipesCreateComponent, title: 'Create Recipe', canActivate:[authGuard]  },
    { path: 'recipeEdit/:id', component: RecipesCreateComponent, title: 'Edit Recipe', canActivate:[authGuardRole]  },
];
